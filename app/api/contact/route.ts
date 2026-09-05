import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const VALID_CATEGORIES = [
  "GENERAL",
  "COLLABORATION",
  "PARTNERSHIP",
  "COMMUNITY",
] as const;

type ContactCategory =
  (typeof VALID_CATEGORIES)[number];

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  category?: unknown;
  message?: unknown;
};

function getString(
  value: unknown,
  maxLength: number
) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isContactCategory(
  value: string
): value is ContactCategory {
  return VALID_CATEGORIES.includes(
    value as ContactCategory
  );
}

export async function POST(request: NextRequest) {
  try {
    const body =
      (await request.json()) as ContactRequestBody;

    const name = getString(body.name, 120);
    const email = getString(body.email, 240);
    const company = getString(body.company, 180);
    const message = getString(body.message, 5000);

    const categoryValue = getString(
      body.category,
      40
    ).toUpperCase();

    const category = isContactCategory(categoryValue)
      ? categoryValue
      : "GENERAL";

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your name.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please tell us a little more about your message.",
        },
        {
          status: 400,
        }
      );
    }

    const contactMessage =
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          company: company || null,
          category,
          message,
        },
        select: {
          id: true,
          createdAt: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thanks for reaching out. We'll be in touch soon.",
        contactMessage,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE_CONTACT_MESSAGE_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "We couldn't send your message. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}