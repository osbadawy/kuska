"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import {
  CalendarDays,
  Check,
  Edit3,
  Footprints,
  ImagePlus,
  Loader2,
  MapPin,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

type RunningContentType =
  | "GUIDE"
  | "PLAN"
  | "JOURNAL"
  | "CITY_GUIDE"
  | "CHALLENGE"
  | "RUN_CLUB_EVENT";

type RunningDifficulty =
  | "ALL_LEVELS"
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED";

type RunningContent = {
  id: string;

  title: string;
  slug: string;

  summary: string | null;
  content: string | null;

  type: RunningContentType;
  difficulty: RunningDifficulty;

  image: string;
  imagePath: string | null;

  durationWeeks: number | null;
  runsPerWeek: number | null;
  distanceKm: number | null;

  location: string | null;
  eventDate: string | null;
  meetingPoint: string | null;
  pace: string | null;

  challengeTarget: string | null;

  tags: string[];

  isPublished: boolean;
  isFeatured: boolean;

  createdAt: string;
  updatedAt: string;
};

type RunningForm = {
  title: string;

  type: RunningContentType;
  difficulty: RunningDifficulty;

  summary: string;
  content: string;

  durationWeeks: string;
  runsPerWeek: string;
  distanceKm: string;

  location: string;
  eventDate: string;
  meetingPoint: string;
  pace: string;

  challengeTarget: string;

  tags: string;

  isPublished: boolean;
  isFeatured: boolean;
};

const EMPTY_FORM: RunningForm = {
  title: "",

  type: "GUIDE",
  difficulty: "ALL_LEVELS",

  summary: "",
  content: "",

  durationWeeks: "",
  runsPerWeek: "",
  distanceKm: "",

  location: "",
  eventDate: "",
  meetingPoint: "",
  pace: "",

  challengeTarget: "",

  tags: "",

  isPublished: true,
  isFeatured: false,
};

const contentTypeOptions: Array<{
  value: RunningContentType;
  label: string;
}> = [
  {
    value: "GUIDE",
    label: "Running Guide",
  },
  {
    value: "PLAN",
    label: "Training Plan",
  },
  {
    value: "JOURNAL",
    label: "Running Journal",
  },
  {
    value: "CITY_GUIDE",
    label: "City Running Guide",
  },
  {
    value: "CHALLENGE",
    label: "Challenge",
  },
  {
    value: "RUN_CLUB_EVENT",
    label: "Run Club Event",
  },
];

export function RunningManager() {
  const [
    items,
    setItems,
  ] = useState<RunningContent[]>([]);

  const [
    form,
    setForm,
  ] =
    useState<RunningForm>(
      EMPTY_FORM
    );

  const [
    editingId,
    setEditingId,
  ] = useState<string | null>(
    null
  );

  const [
    imageFile,
    setImageFile,
  ] = useState<File | null>(
    null
  );

  const [
    previewUrl,
    setPreviewUrl,
  ] = useState<string | null>(
    null
  );

  const [
    existingImage,
    setExistingImage,
  ] = useState<string | null>(
    null
  );

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isSaving,
    setIsSaving,
  ] = useState(false);

  const [
    deletingId,
    setDeletingId,
  ] = useState<string | null>(
    null
  );

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  async function loadContent() {
    setIsLoading(true);

    try {
      const response =
        await fetch(
          "/api/dashboard/running",
          {
            cache: "no-store",
          }
        );

      const payload =
        await response.json();

      if (
        !response.ok ||
        !payload.success
      ) {
        throw new Error(
          payload.error ||
            "Unable to load running content."
        );
      }

      setItems(
        payload.content
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load running content."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadContent();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(
          previewUrl
        );
      }
    };
  }, [previewUrl]);

  function updateField<
    K extends keyof RunningForm
  >(
    key: K,
    value: RunningForm[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(
        previewUrl
      );
    }

    setImageFile(file);

    setPreviewUrl(
      URL.createObjectURL(file)
    );
  }

  function resetForm() {
    if (previewUrl) {
      URL.revokeObjectURL(
        previewUrl
      );
    }

    setForm(EMPTY_FORM);

    setEditingId(null);
    setImageFile(null);
    setPreviewUrl(null);
    setExistingImage(null);
    setError("");
  }

  function dateToInput(
    value: string | null
  ) {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    const offset =
      date.getTimezoneOffset();

    const localDate =
      new Date(
        date.getTime() -
          offset * 60_000
      );

    return localDate
      .toISOString()
      .slice(0, 16);
  }

  function editItem(
    item: RunningContent
  ) {
    if (previewUrl) {
      URL.revokeObjectURL(
        previewUrl
      );
    }

    setEditingId(item.id);

    setForm({
      title: item.title,

      type: item.type,
      difficulty:
        item.difficulty,

      summary:
        item.summary || "",

      content:
        item.content || "",

      durationWeeks:
        item.durationWeeks !==
        null
          ? String(
              item.durationWeeks
            )
          : "",

      runsPerWeek:
        item.runsPerWeek !==
        null
          ? String(
              item.runsPerWeek
            )
          : "",

      distanceKm:
        item.distanceKm !==
        null
          ? String(
              item.distanceKm
            )
          : "",

      location:
        item.location || "",

      eventDate:
        dateToInput(
          item.eventDate
        ),

      meetingPoint:
        item.meetingPoint ||
        "",

      pace:
        item.pace || "",

      challengeTarget:
        item.challengeTarget ||
        "",

      tags:
        item.tags.join("\n"),

      isPublished:
        item.isPublished,

      isFeatured:
        item.isFeatured,
    });

    setImageFile(null);
    setPreviewUrl(null);

    setExistingImage(
      item.image
    );

    setSuccess("");

    document
      .getElementById(
        "running-editor"
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  function linesToArray(
    value: string
  ) {
    return value
      .split("\n")
      .map((item) =>
        item.trim()
      )
      .filter(Boolean);
  }

  function buildFormData() {
    const data =
      new FormData();

    data.set(
      "title",
      form.title
    );

    data.set(
      "type",
      form.type
    );

    data.set(
      "difficulty",
      form.difficulty
    );

    data.set(
      "summary",
      form.summary
    );

    data.set(
      "content",
      form.content
    );

    data.set(
      "durationWeeks",
      form.durationWeeks
    );

    data.set(
      "runsPerWeek",
      form.runsPerWeek
    );

    data.set(
      "distanceKm",
      form.distanceKm
    );

    data.set(
      "location",
      form.location
    );

    data.set(
      "eventDate",
      form.eventDate
    );

    data.set(
      "meetingPoint",
      form.meetingPoint
    );

    data.set(
      "pace",
      form.pace
    );

    data.set(
      "challengeTarget",
      form.challengeTarget
    );

    data.set(
      "tags",
      JSON.stringify(
        linesToArray(
          form.tags
        )
      )
    );

    data.set(
      "isPublished",
      String(
        form.isPublished
      )
    );

    data.set(
      "isFeatured",
      String(
        form.isFeatured
      )
    );

    if (imageFile) {
      data.set(
        "image",
        imageFile
      );
    }

    return data;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !editingId &&
      !imageFile
    ) {
      setError(
        "Please upload an image."
      );

      return;
    }

    setIsSaving(true);

    try {
      const response =
        await fetch(
          editingId
            ? `/api/dashboard/running/${editingId}`
            : "/api/dashboard/running",
          {
            method:
              editingId
                ? "PUT"
                : "POST",

            body:
              buildFormData(),
          }
        );

      const payload =
        await response.json();

      if (
        !response.ok ||
        !payload.success
      ) {
        throw new Error(
          payload.error ||
            "Unable to save content."
        );
      }

      const message =
        editingId
          ? "Running content updated."
          : "Running content created.";

      resetForm();

      setSuccess(message);

      await loadContent();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save content."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteItem(
    item: RunningContent
  ) {
    const confirmed =
      window.confirm(
        `Delete "${item.title}"? This cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    setDeletingId(
      item.id
    );

    try {
      const response =
        await fetch(
          `/api/dashboard/running/${item.id}`,
          {
            method:
              "DELETE",
          }
        );

      const payload =
        await response.json();

      if (
        !response.ok ||
        !payload.success
      ) {
        throw new Error(
          payload.error ||
            "Unable to delete content."
        );
      }

      setItems(
        (current) =>
          current.filter(
            (content) =>
              content.id !==
              item.id
          )
      );

      if (
        editingId ===
        item.id
      ) {
        resetForm();
      }

      setSuccess(
        "Running content deleted."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete content."
      );
    } finally {
      setDeletingId(null);
    }
  }

  const displayedImage =
    previewUrl ||
    existingImage;

  return (
    <section className="py-8 lg:py-10">
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          justify-between
          gap-6
          border-b
          border-[#28211F]/10
          pb-8
          sm:flex-row
          sm:items-end
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <Footprints
              size={14}
              className="text-[#B87E74]"
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B87E74]">
              Running
            </p>
          </div>

          <h2 className="mt-3 font-serif text-4xl tracking-[-0.03em]">
            Running content
          </h2>

          <p className="mt-3 max-w-[550px] text-sm leading-6 text-[#7A6C67]">
            Manage guides, plans,
            journal entries, city
            guides, challenges and
            run-club events.
          </p>
        </div>

        <div className="rounded-full border border-[#28211F]/10 bg-white px-4 py-2 text-xs text-[#7A6C67]">
          {items.length} items
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-[18px] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 flex items-center gap-3 rounded-[18px] border border-[#82997E]/20 bg-[#82997E]/10 px-5 py-4 text-sm text-[#576953]">
          <Check size={15} />

          {success}
        </div>
      )}

      {/* EDITOR */}

      <form
        id="running-editor"
        onSubmit={
          handleSubmit
        }
        className="
          mt-8
          overflow-hidden
          rounded-[30px]
          border
          border-[#28211F]/10
          bg-white
        "
      >
        <div className="flex items-center justify-between border-b border-[#28211F]/10 px-7 py-5">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#B87E74]">
              {editingId
                ? "Editing"
                : "New content"}
            </p>

            <h3 className="mt-1 font-serif text-2xl">
              {editingId
                ? form.title ||
                  "Running content"
                : "Add to the running world"}
            </h3>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#28211F]/10 hover:bg-[#FAF7F5]"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-[360px_1fr]">
          {/* IMAGE */}

          <div className="border-b border-[#28211F]/10 bg-[#F5EEEA] p-7 lg:border-b-0 lg:border-r">
            <p className={
              labelClass
            }>
              Cover image
            </p>

            <label
              className="
                group
                relative
                mt-3
                block
                aspect-[4/3]
                cursor-pointer
                overflow-hidden
                rounded-[24px]
                border
                border-dashed
                border-[#B87E74]/30
                bg-[#EDE2DD]
              "
            >
              {displayedImage ? (
                <>
                  <Image
                    src={
                      displayedImage
                    }
                    alt="Running content preview"
                    fill
                    sizes="360px"
                    className="object-cover"
                    unoptimized={
                      displayedImage.startsWith(
                        "blob:"
                      )
                    }
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-medium">
                      Change image
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#B87E74]">
                    <ImagePlus
                      size={18}
                    />
                  </div>

                  <p className="mt-4 text-sm font-medium">
                    Upload image
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#8B7D78]">
                    JPG, PNG or WebP.
                    <br />
                    Maximum 8 MB.
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={
                  handleImageChange
                }
                className="sr-only"
              />
            </label>
          </div>

          {/* MAIN FORM */}

          <div className="p-7 sm:p-9">
            <div className="grid gap-6 md:grid-cols-2">
              <Field
                label="Title"
                required
              >
                <input
                  required
                  value={
                    form.title
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "title",
                      event.target
                        .value
                    )
                  }
                  placeholder="Your First 5K"
                  className={
                    inputClass
                  }
                />
              </Field>

              <Field
                label="Content type"
                required
              >
                <select
                  value={
                    form.type
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "type",
                      event.target
                        .value as RunningContentType
                    )
                  }
                  className={
                    inputClass
                  }
                >
                  {contentTypeOptions.map(
                    (option) => (
                      <option
                        key={
                          option.value
                        }
                        value={
                          option.value
                        }
                      >
                        {
                          option.label
                        }
                      </option>
                    )
                  )}
                </select>
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Short summary">
                <textarea
                  rows={3}
                  value={
                    form.summary
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "summary",
                      event.target
                        .value
                    )
                  }
                  placeholder="A short introduction shown on cards and previews..."
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field
                label="Main content"
                hint="Full article / description"
              >
                <textarea
                  rows={12}
                  value={
                    form.content
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "content",
                      event.target
                        .value
                    )
                  }
                  placeholder="Write the full running guide, journal entry, challenge description or event information..."
                  className={`${inputClass} resize-y`}
                />
              </Field>
            </div>

            {/* TRAINING INFO */}

            <p className={
              sectionTitle
            }>
              Training details
            </p>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Difficulty">
                <select
                  value={
                    form.difficulty
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "difficulty",
                      event.target
                        .value as RunningDifficulty
                    )
                  }
                  className={
                    inputClass
                  }
                >
                  <option value="ALL_LEVELS">
                    All levels
                  </option>

                  <option value="BEGINNER">
                    Beginner
                  </option>

                  <option value="INTERMEDIATE">
                    Intermediate
                  </option>

                  <option value="ADVANCED">
                    Advanced
                  </option>
                </select>
              </Field>

              <NumberField
                label="Weeks"
                value={
                  form.durationWeeks
                }
                onChange={(
                  value
                ) =>
                  updateField(
                    "durationWeeks",
                    value
                  )
                }
              />

              <NumberField
                label="Runs / week"
                value={
                  form.runsPerWeek
                }
                onChange={(
                  value
                ) =>
                  updateField(
                    "runsPerWeek",
                    value
                  )
                }
              />

              <NumberField
                label="Distance (km)"
                value={
                  form.distanceKm
                }
                step="0.1"
                onChange={(
                  value
                ) =>
                  updateField(
                    "distanceKm",
                    value
                  )
                }
              />
            </div>

            {/* LOCATION / EVENT */}

            <p className={
              sectionTitle
            }>
              Event & location
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Location">
                <input
                  value={
                    form.location
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "location",
                      event.target
                        .value
                    )
                  }
                  placeholder="Barcelona, Spain"
                  className={
                    inputClass
                  }
                />
              </Field>

              <Field label="Event date">
                <input
                  type="datetime-local"
                  value={
                    form.eventDate
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "eventDate",
                      event.target
                        .value
                    )
                  }
                  className={
                    inputClass
                  }
                />
              </Field>

              <Field label="Meeting point">
                <input
                  value={
                    form.meetingPoint
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "meetingPoint",
                      event.target
                        .value
                    )
                  }
                  placeholder="Beach promenade"
                  className={
                    inputClass
                  }
                />
              </Field>

              <Field label="Pace">
                <input
                  value={
                    form.pace
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "pace",
                      event.target
                        .value
                    )
                  }
                  placeholder="Social / conversational"
                  className={
                    inputClass
                  }
                />
              </Field>
            </div>

            {/* CHALLENGE */}

            <div className="mt-6">
              <Field label="Challenge target">
                <input
                  value={
                    form.challengeTarget
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "challengeTarget",
                      event.target
                        .value
                    )
                  }
                  placeholder="Run 50 km this month"
                  className={
                    inputClass
                  }
                />
              </Field>
            </div>

            {/* TAGS */}

            <div className="mt-6">
              <Field
                label="Tags"
                hint="One per line"
              >
                <textarea
                  rows={4}
                  value={
                    form.tags
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "tags",
                      event.target
                        .value
                    )
                  }
                  placeholder={`5K\nBeginner\nRoad running`}
                  className={`${inputClass} resize-y`}
                />
              </Field>
            </div>

            {/* FLAGS */}

            <div className="mt-8 flex flex-wrap gap-3">
              <Toggle
                checked={
                  form.isPublished
                }
                onChange={(
                  value
                ) =>
                  updateField(
                    "isPublished",
                    value
                  )
                }
                label="Published"
              />

              <Toggle
                checked={
                  form.isFeatured
                }
                onChange={(
                  value
                ) =>
                  updateField(
                    "isFeatured",
                    value
                  )
                }
                label="Featured"
              />
            </div>

            <div className="mt-9 flex gap-3 border-t border-[#28211F]/10 pt-7">
              <button
                type="submit"
                disabled={
                  isSaving
                }
                className="
                  inline-flex
                  h-12
                  items-center
                  gap-3
                  rounded-full
                  bg-[#28211F]
                  px-6
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-white
                  transition
                  hover:bg-[#443733]
                  disabled:opacity-50
                "
              >
                {isSaving ? (
                  <>
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                    Saving
                  </>
                ) : editingId ? (
                  <>
                    <Save
                      size={14}
                    />
                    Save changes
                  </>
                ) : (
                  <>
                    <Plus
                      size={14}
                    />
                    Add content
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={
                    resetForm
                  }
                  className="h-12 rounded-full border border-[#28211F]/10 px-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#7A6C67]"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* LIBRARY */}

      <div className="mt-14">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B87E74]">
          Library
        </p>

        <h3 className="mt-2 font-serif text-3xl">
          Running content
        </h3>

        {isLoading ? (
          <div className="mt-6 flex min-h-[240px] items-center justify-center rounded-[28px] border border-[#28211F]/10 bg-white">
            <Loader2
              size={22}
              className="animate-spin text-[#B87E74]"
            />
          </div>
        ) : items.length === 0 ? (
          <div className="mt-6 flex min-h-[240px] flex-col items-center justify-center rounded-[28px] border border-dashed border-[#28211F]/15 text-center">
            <Footprints className="text-[#B87E74]" />

            <p className="mt-4 font-serif text-2xl">
              Nothing here yet.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map(
              (item) => (
                <article
                  key={
                    item.id
                  }
                  className="overflow-hidden rounded-[26px] border border-[#E8DDD8] bg-white"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={
                        item.image
                      }
                      alt={
                        item.title
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />

                    <div className="absolute left-4 top-4 flex gap-2">
                      <Badge>
                        {typeLabel(
                          item.type
                        )}
                      </Badge>

                      <Badge>
                        {item.isPublished
                          ? "Published"
                          : "Draft"}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#B87E74]">
                      {difficultyLabel(
                        item.difficulty
                      )}
                    </p>

                    <h4 className="mt-2 font-serif text-[26px] leading-tight">
                      {
                        item.title
                      }
                    </h4>

                    {item.summary && (
                      <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#7A6C67]">
                        {
                          item.summary
                        }
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-3 text-[10px] text-[#8B7D78]">
                      {item.distanceKm !==
                        null && (
                        <span>
                          {
                            item.distanceKm
                          }{" "}
                          km
                        </span>
                      )}

                      {item.durationWeeks !==
                        null && (
                        <span>
                          {
                            item.durationWeeks
                          }{" "}
                          weeks
                        </span>
                      )}

                      {item.location && (
                        <span className="flex items-center gap-1">
                          <MapPin
                            size={10}
                          />

                          {
                            item.location
                          }
                        </span>
                      )}

                      {item.eventDate && (
                        <span className="flex items-center gap-1">
                          <CalendarDays
                            size={10}
                          />

                          {new Date(
                            item.eventDate
                          ).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex gap-2 border-t border-[#EEE5E1] pt-4">
                      <button
                        type="button"
                        onClick={() =>
                          editItem(
                            item
                          )
                        }
                        className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-[#28211F]/10 text-[10px] font-semibold uppercase tracking-[0.12em] hover:bg-[#FAF7F5]"
                      >
                        <Edit3
                          size={13}
                        />

                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={
                          deletingId ===
                          item.id
                        }
                        onClick={() =>
                          void deleteItem(
                            item
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId ===
                        item.id ? (
                          <Loader2
                            size={13}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2
                            size={13}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

const inputClass = `
  w-full
  rounded-[14px]
  border
  border-[#28211F]/10
  bg-[#FAF7F5]
  px-4
  py-3.5
  text-sm
  text-[#28211F]
  outline-none
  transition
  placeholder:text-[#9A8983]/50
  focus:border-[#D8A399]
  focus:bg-white
  focus:ring-4
  focus:ring-[#D8A399]/10
`;

const labelClass =
  "text-[10px] font-medium uppercase tracking-[0.16em] text-[#74625C]";

const sectionTitle =
  "mb-4 mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B87E74]";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className={
          labelClass
        }>
          {label}

          {required && (
            <span className="ml-1 text-[#B87E74]">
              *
            </span>
          )}
        </span>

        {hint && (
          <span className="text-[9px] text-[#A28F88]">
            {hint}
          </span>
        )}
      </div>

      {children}
    </label>
  );
}

function NumberField({
  label,
  value,
  step = "1",
  onChange,
}: {
  label: string;
  value: string;
  step?: string;
  onChange: (
    value: string
  ) => void;
}) {
  return (
    <Field label={label}>
      <input
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={(
          event
        ) =>
          onChange(
            event.target.value
          )
        }
        className={
          inputClass
        }
      />
    </Field>
  );
}

function Toggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (
    value: boolean
  ) => void;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onChange(!checked)
      }
      className={`
        flex
        items-center
        gap-3
        rounded-full
        border
        px-4
        py-2.5
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.12em]

        ${
          checked
            ? "border-[#28211F] bg-[#28211F] text-white"
            : "border-[#28211F]/10 bg-white text-[#7A6C67]"
        }
      `}
    >
      <span
        className={`
          flex
          h-4
          w-4
          items-center
          justify-center
          rounded-full

          ${
            checked
              ? "bg-[#E7B6AB] text-[#28211F]"
              : "bg-[#EDE3DF]"
          }
        `}
      >
        {checked && (
          <Check
            size={9}
          />
        )}
      </span>

      {label}
    </button>
  );
}

function Badge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-xl">
      {children}
    </span>
  );
}

function typeLabel(
  type: RunningContentType
) {
  switch (type) {
    case "GUIDE":
      return "Guide";

    case "PLAN":
      return "Plan";

    case "JOURNAL":
      return "Journal";

    case "CITY_GUIDE":
      return "City Guide";

    case "CHALLENGE":
      return "Challenge";

    case "RUN_CLUB_EVENT":
      return "Run Club";
  }
}

function difficultyLabel(
  value: RunningDifficulty
) {
  switch (value) {
    case "ALL_LEVELS":
      return "All levels";

    case "BEGINNER":
      return "Beginner";

    case "INTERMEDIATE":
      return "Intermediate";

    case "ADVANCED":
      return "Advanced";
  }
}