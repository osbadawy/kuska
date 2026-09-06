"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import {
  Check,
  Edit3,
  ImagePlus,
  Loader2,
  Plus,
  Salad,
  Save,
  Trash2,
  X,
} from "lucide-react";

type NutritionRecipe = {
  id: string;

  title: string;
  slug: string;
  description: string | null;

  image: string;
  imagePath: string | null;

  category: string;

  calories: number;
  protein: number;
  carbs: number | null;
  fat: number | null;

  prepTime: number | null;
  cookTime: number | null;
  servings: number | null;

  ingredients: string[];
  instructions: string[];

  isPublished: boolean;
  isFeatured: boolean;

  createdAt: string;
  updatedAt: string;
};

type RecipeForm = {
  title: string;
  description: string;
  category: string;

  calories: string;
  protein: string;
  carbs: string;
  fat: string;

  prepTime: string;
  cookTime: string;
  servings: string;

  ingredients: string;
  instructions: string;

  isPublished: boolean;
  isFeatured: boolean;
};

const EMPTY_FORM: RecipeForm = {
  title: "",
  description: "",
  category: "High Protein",

  calories: "",
  protein: "",
  carbs: "",
  fat: "",

  prepTime: "",
  cookTime: "",
  servings: "",

  ingredients: "",
  instructions: "",

  isPublished: true,
  isFeatured: false,
};

export function NutritionManager() {
  const [recipes, setRecipes] = useState<
    NutritionRecipe[]
  >([]);

  const [form, setForm] =
    useState<RecipeForm>(EMPTY_FORM);

  const [editingId, setEditingId] = useState<
    string | null
  >(null);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const [existingImage, setExistingImage] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ═════════════════════════════════════
     LOAD
  ══════════════════════════════════════ */

  async function loadRecipes() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/dashboard/nutrition",
        {
          cache: "no-store",
        }
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.error ||
            "Unable to load recipes."
        );
      }

      setRecipes(payload.recipes);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load recipes."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadRecipes();
  }, []);

  /* ═════════════════════════════════════
     PREVIEW CLEANUP
  ══════════════════════════════════════ */

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  /* ═════════════════════════════════════
     FORM HELPERS
  ══════════════════════════════════════ */

  function updateField<K extends keyof RecipeForm>(
    key: K,
    value: RecipeForm[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function resetForm() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setForm(EMPTY_FORM);
    setEditingId(null);
    setImageFile(null);
    setPreviewUrl(null);
    setExistingImage(null);
    setError("");
  }

  function editRecipe(recipe: NutritionRecipe) {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setEditingId(recipe.id);

    setForm({
      title: recipe.title,
      description: recipe.description || "",
      category: recipe.category,

      calories: String(recipe.calories),
      protein: String(recipe.protein),
      carbs:
        recipe.carbs !== null
          ? String(recipe.carbs)
          : "",
      fat:
        recipe.fat !== null
          ? String(recipe.fat)
          : "",

      prepTime:
        recipe.prepTime !== null
          ? String(recipe.prepTime)
          : "",
      cookTime:
        recipe.cookTime !== null
          ? String(recipe.cookTime)
          : "",
      servings:
        recipe.servings !== null
          ? String(recipe.servings)
          : "",

      ingredients: recipe.ingredients.join("\n"),
      instructions: recipe.instructions.join(
        "\n"
      ),

      isPublished: recipe.isPublished,
      isFeatured: recipe.isFeatured,
    });

    setImageFile(null);
    setPreviewUrl(null);
    setExistingImage(recipe.image);
    setSuccess("");

    document
      .getElementById("recipe-editor")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  function linesToArray(value: string) {
    return value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  function createFormData() {
    const data = new FormData();

    data.set("title", form.title);
    data.set(
      "description",
      form.description
    );
    data.set("category", form.category);

    data.set("calories", form.calories);
    data.set("protein", form.protein);
    data.set("carbs", form.carbs);
    data.set("fat", form.fat);

    data.set("prepTime", form.prepTime);
    data.set("cookTime", form.cookTime);
    data.set("servings", form.servings);

    data.set(
      "ingredients",
      JSON.stringify(
        linesToArray(form.ingredients)
      )
    );

    data.set(
      "instructions",
      JSON.stringify(
        linesToArray(form.instructions)
      )
    );

    data.set(
      "isPublished",
      String(form.isPublished)
    );

    data.set(
      "isFeatured",
      String(form.isFeatured)
    );

    if (imageFile) {
      data.set("image", imageFile);
    }

    return data;
  }

  /* ═════════════════════════════════════
     SAVE
  ══════════════════════════════════════ */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!editingId && !imageFile) {
      setError(
        "Please select an image for the recipe."
      );
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        editingId
          ? `/api/dashboard/nutrition/${editingId}`
          : "/api/dashboard/nutrition",
        {
          method: editingId ? "PUT" : "POST",
          body: createFormData(),
        }
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.error ||
            "Unable to save recipe."
        );
      }

      setSuccess(
        editingId
          ? "Recipe updated successfully."
          : "Recipe created successfully."
      );

      resetForm();

      await loadRecipes();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save recipe."
      );
    } finally {
      setIsSaving(false);
    }
  }

  /* ═════════════════════════════════════
     DELETE
  ══════════════════════════════════════ */

  async function deleteRecipe(
    recipe: NutritionRecipe
  ) {
    const confirmed = window.confirm(
      `Delete "${recipe.title}"? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(recipe.id);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `/api/dashboard/nutrition/${recipe.id}`,
        {
          method: "DELETE",
        }
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.error ||
            "Unable to delete recipe."
        );
      }

      if (editingId === recipe.id) {
        resetForm();
      }

      setRecipes((current) =>
        current.filter(
          (item) => item.id !== recipe.id
        )
      );

      setSuccess("Recipe deleted.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete recipe."
      );
    } finally {
      setDeletingId(null);
    }
  }

  const displayedImage =
    previewUrl || existingImage;

  return (
    <section className="mt-14 pb-24">
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
            <Salad
              size={14}
              className="text-[#B87E74]"
            />

            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B87E74]">
              Nutrition
            </p>
          </div>

          <h2 className="mt-3 font-serif text-4xl text-[#28211F]">
            Recipe manager
          </h2>

          <p className="mt-3 text-sm text-[#7A6C67]">
            Create, edit and publish recipes for
            Kuska Motion.
          </p>
        </div>

        <div className="rounded-full border border-[#28211F]/10 bg-white px-4 py-2 text-xs text-[#7A6C67]">
          {recipes.length} recipes
        </div>
      </div>

      {/* MESSAGES */}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#82997E]/20 bg-[#82997E]/10 px-5 py-4 text-sm text-[#576953]">
          <Check size={16} />

          {success}
        </div>
      )}

      {/* EDITOR */}

      <form
        id="recipe-editor"
        onSubmit={handleSubmit}
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
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#B87E74]">
              {editingId
                ? "Editing recipe"
                : "New recipe"}
            </p>

            <h3 className="mt-1 font-serif text-2xl">
              {editingId
                ? form.title || "Recipe"
                : "Add something delicious"}
            </h3>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#28211F]/10 transition hover:bg-[#FAF7F5]"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-[360px_1fr]">
          {/* IMAGE */}

          <div className="border-b border-[#28211F]/10 bg-[#F7F1EE] p-7 lg:border-b-0 lg:border-r">
            <p className={labelClass}>
              Recipe image
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
                bg-[#EFE3DE]
              "
            >
              {displayedImage ? (
                <>
                  <Image
                    src={displayedImage}
                    alt="Recipe preview"
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
                    <div className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#28211F]">
                      Change image
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#B87E74]">
                    <ImagePlus size={19} />
                  </div>

                  <p className="mt-4 text-sm font-medium">
                    Upload recipe image
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
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>
          </div>

          {/* DETAILS */}

          <div className="p-7 sm:p-9">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Recipe title"
                required
              >
                <input
                  required
                  value={form.title}
                  onChange={(event) =>
                    updateField(
                      "title",
                      event.target.value
                    )
                  }
                  placeholder="Honey Garlic Salmon Bowl"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Category"
                required
              >
                <input
                  required
                  value={form.category}
                  onChange={(event) =>
                    updateField(
                      "category",
                      event.target.value
                    )
                  }
                  placeholder="High Protein"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Description">
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="A short introduction to the recipe..."
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>

            {/* MACROS */}

            <p className="mb-4 mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B87E74]">
              Nutrition
            </p>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <NumberField
                label="Calories"
                value={form.calories}
                required
                onChange={(value) =>
                  updateField("calories", value)
                }
              />

              <NumberField
                label="Protein (g)"
                value={form.protein}
                required
                onChange={(value) =>
                  updateField("protein", value)
                }
              />

              <NumberField
                label="Carbs (g)"
                value={form.carbs}
                onChange={(value) =>
                  updateField("carbs", value)
                }
              />

              <NumberField
                label="Fat (g)"
                value={form.fat}
                onChange={(value) =>
                  updateField("fat", value)
                }
              />
            </div>

            {/* TIME */}

            <p className="mb-4 mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B87E74]">
              Recipe details
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <NumberField
                label="Prep time (min)"
                value={form.prepTime}
                onChange={(value) =>
                  updateField("prepTime", value)
                }
              />

              <NumberField
                label="Cook time (min)"
                value={form.cookTime}
                onChange={(value) =>
                  updateField("cookTime", value)
                }
              />

              <NumberField
                label="Servings"
                value={form.servings}
                onChange={(value) =>
                  updateField("servings", value)
                }
              />
            </div>

            {/* INGREDIENTS */}

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <Field
                label="Ingredients"
                hint="One ingredient per line"
              >
                <textarea
                  rows={9}
                  value={form.ingredients}
                  onChange={(event) =>
                    updateField(
                      "ingredients",
                      event.target.value
                    )
                  }
                  placeholder={`300g salmon fillet\n150g jasmine rice\n1 tbsp honey\n2 cloves garlic`}
                  className={`${inputClass} resize-y`}
                />
              </Field>

              <Field
                label="Instructions"
                hint="One step per line"
              >
                <textarea
                  rows={9}
                  value={form.instructions}
                  onChange={(event) =>
                    updateField(
                      "instructions",
                      event.target.value
                    )
                  }
                  placeholder={`Cook the rice.\nPrepare the sauce.\nCook the salmon.\nAssemble the bowl.`}
                  className={`${inputClass} resize-y`}
                />
              </Field>
            </div>

            {/* FLAGS */}

            <div className="mt-8 flex flex-wrap gap-3">
              <Toggle
                checked={form.isPublished}
                onChange={(checked) =>
                  updateField(
                    "isPublished",
                    checked
                  )
                }
                label="Published"
              />

              <Toggle
                checked={form.isFeatured}
                onChange={(checked) =>
                  updateField(
                    "isFeatured",
                    checked
                  )
                }
                label="Featured"
              />
            </div>

            {/* SAVE */}

            <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-[#28211F]/10 pt-7">
              <button
                type="submit"
                disabled={isSaving}
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
                  disabled:cursor-not-allowed
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
                    <Save size={14} />

                    Save changes
                  </>
                ) : (
                  <>
                    <Plus size={14} />

                    Add recipe
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="h-12 rounded-full border border-[#28211F]/10 px-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#7A6C67] transition hover:bg-[#FAF7F5]"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* RECIPES */}

      <div className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B87E74]">
              Library
            </p>

            <h3 className="mt-2 font-serif text-3xl">
              Existing recipes
            </h3>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-[250px] items-center justify-center rounded-[28px] border border-[#28211F]/10 bg-white">
            <Loader2
              size={22}
              className="animate-spin text-[#B87E74]"
            />
          </div>
        ) : recipes.length === 0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center rounded-[28px] border border-dashed border-[#28211F]/15 bg-white/40 text-center">
            <Salad className="text-[#B87E74]" />

            <p className="mt-4 font-serif text-2xl">
              No recipes yet.
            </p>

            <p className="mt-2 text-sm text-[#7A6C67]">
              Add your first recipe above.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recipes.map((recipe) => (
              <article
                key={recipe.id}
                className="overflow-hidden rounded-[26px] border border-[#E8DDD8] bg-white"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F1E8E4]">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />

                  <div className="absolute left-4 top-4 flex gap-2">
                    {recipe.isPublished ? (
                      <Badge>
                        Published
                      </Badge>
                    ) : (
                      <Badge>Draft</Badge>
                    )}

                    {recipe.isFeatured && (
                      <Badge>Featured</Badge>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#B87E74]">
                    {recipe.category}
                  </p>

                  <h4 className="mt-2 font-serif text-[25px] leading-tight">
                    {recipe.title}
                  </h4>

                  <div className="mt-4 flex gap-4 text-xs text-[#8B7D78]">
                    <span>
                      {recipe.protein}g protein
                    </span>

                    <span>
                      {recipe.calories} cal
                    </span>
                  </div>

                  <div className="mt-5 flex gap-2 border-t border-[#EEE5E1] pt-4">
                    <button
                      type="button"
                      onClick={() =>
                        editRecipe(recipe)
                      }
                      className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-[#28211F]/10 text-[10px] font-semibold uppercase tracking-[0.12em] transition hover:bg-[#FAF7F5]"
                    >
                      <Edit3 size={13} />

                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={
                        deletingId === recipe.id
                      }
                      onClick={() =>
                        void deleteRecipe(recipe)
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-red-200 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === recipe.id ? (
                        <Loader2
                          size={14}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ═════════════════════════════════════
   SMALL COMPONENTS
═════════════════════════════════════ */

const inputClass = `
  w-full
  rounded-[14px]
  border
  border-[#28211F]/10
  bg-[#FAF7F5]
  px-4
  py-3.5
  text-[14px]
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
        <span className={labelClass}>
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
  required,
  onChange,
}: {
  label: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <Field
      label={label}
      required={required}
    >
      <input
        type="number"
        min="0"
        required={required}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={inputClass}
      />
    </Field>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
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
        transition

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
        {checked && <Check size={10} />}
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
    <span className="rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-xl">
      {children}
    </span>
  );
}