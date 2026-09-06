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
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Edit3,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

/* ═════════════════════════════════════
   TYPES
═════════════════════════════════════ */

type WorkoutDifficulty =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED";

type WorkoutExercise = {
  id?: string;

  name: string;
  sets: string;
  reps: string;

  durationSeconds: string;
  restSeconds: string;

  notes: string;
};

type Workout = {
  id: string;

  title: string;
  slug: string;
  description: string | null;

  image: string;
  imagePath: string | null;

  category: string;
  difficulty: WorkoutDifficulty;

  durationMinutes: number | null;
  caloriesBurned: number | null;

  equipment: string[];
  targetAreas: string[];

  isPublished: boolean;
  isFeatured: boolean;

  exercises: Array<{
    id: string;

    name: string;

    sets: number | null;
    reps: string | null;

    durationSeconds:
      | number
      | null;

    restSeconds:
      | number
      | null;

    notes: string | null;

    order: number;
  }>;

  createdAt: string;
  updatedAt: string;
};

type WorkoutForm = {
  title: string;
  description: string;
  category: string;

  difficulty:
    WorkoutDifficulty;

  durationMinutes: string;
  caloriesBurned: string;

  equipment: string;
  targetAreas: string;

  isPublished: boolean;
  isFeatured: boolean;
};

const EMPTY_FORM: WorkoutForm = {
  title: "",
  description: "",

  category: "Strength",

  difficulty:
    "BEGINNER",

  durationMinutes: "",
  caloriesBurned: "",

  equipment: "",
  targetAreas: "",

  isPublished: true,
  isFeatured: false,
};

const EMPTY_EXERCISE: WorkoutExercise = {
  name: "",
  sets: "",
  reps: "",
  durationSeconds: "",
  restSeconds: "",
  notes: "",
};

/* ═════════════════════════════════════
   COMPONENT
═════════════════════════════════════ */

export function WorkoutManager() {
  const [
    workouts,
    setWorkouts,
  ] = useState<Workout[]>([]);

  const [
    form,
    setForm,
  ] =
    useState<WorkoutForm>(
      EMPTY_FORM
    );

  const [
    exercises,
    setExercises,
  ] = useState<
    WorkoutExercise[]
  >([
    {
      ...EMPTY_EXERCISE,
    },
  ]);

  const [
    editingId,
    setEditingId,
  ] = useState<
    string | null
  >(null);

  const [
    imageFile,
    setImageFile,
  ] = useState<
    File | null
  >(null);

  const [
    previewUrl,
    setPreviewUrl,
  ] = useState<
    string | null
  >(null);

  const [
    existingImage,
    setExistingImage,
  ] = useState<
    string | null
  >(null);

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
  ] = useState<
    string | null
  >(null);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  /* ═════════════════════════════════════
     LOAD
  ══════════════════════════════════════ */

  async function loadWorkouts() {
    setIsLoading(true);
    setError("");

    try {
      const response =
        await fetch(
          "/api/dashboard/workouts",
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
            "Unable to load workouts."
        );
      }

      setWorkouts(
        payload.workouts
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load workouts."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadWorkouts();
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

  /* ═════════════════════════════════════
     FORM HELPERS
  ══════════════════════════════════════ */

  function updateField<
    K extends keyof WorkoutForm
  >(
    key: K,
    value: WorkoutForm[K]
  ) {
    setForm(
      (current) => ({
        ...current,
        [key]: value,
      })
    );
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

    setForm(
      EMPTY_FORM
    );

    setExercises([
      {
        ...EMPTY_EXERCISE,
      },
    ]);

    setEditingId(null);
    setImageFile(null);
    setPreviewUrl(null);
    setExistingImage(null);
    setError("");
  }

  /* ═════════════════════════════════════
     EXERCISES
  ══════════════════════════════════════ */

  function addExercise() {
    setExercises(
      (current) => [
        ...current,
        {
          ...EMPTY_EXERCISE,
        },
      ]
    );
  }

  function updateExercise(
    index: number,
    field: keyof WorkoutExercise,
    value: string
  ) {
    setExercises(
      (current) =>
        current.map(
          (
            exercise,
            exerciseIndex
          ) =>
            exerciseIndex ===
            index
              ? {
                  ...exercise,
                  [field]:
                    value,
                }
              : exercise
        )
    );
  }

  function removeExercise(
    index: number
  ) {
    setExercises(
      (current) => {
        const next =
          current.filter(
            (
              _exercise,
              exerciseIndex
            ) =>
              exerciseIndex !==
              index
          );

        return next.length
          ? next
          : [
              {
                ...EMPTY_EXERCISE,
              },
            ];
      }
    );
  }

  function moveExercise(
    index: number,
    direction:
      | "up"
      | "down"
  ) {
    setExercises(
      (current) => {
        const destination =
          direction === "up"
            ? index - 1
            : index + 1;

        if (
          destination < 0 ||
          destination >=
            current.length
        ) {
          return current;
        }

        const next = [
          ...current,
        ];

        [
          next[index],
          next[destination],
        ] = [
          next[destination],
          next[index],
        ];

        return next;
      }
    );
  }

  /* ═════════════════════════════════════
     EDIT
  ══════════════════════════════════════ */

  function editWorkout(
    workout: Workout
  ) {
    if (previewUrl) {
      URL.revokeObjectURL(
        previewUrl
      );
    }

    setEditingId(
      workout.id
    );

    setForm({
      title: workout.title,

      description:
        workout.description ||
        "",

      category:
        workout.category,

      difficulty:
        workout.difficulty,

      durationMinutes:
        workout.durationMinutes !==
        null
          ? String(
              workout.durationMinutes
            )
          : "",

      caloriesBurned:
        workout.caloriesBurned !==
        null
          ? String(
              workout.caloriesBurned
            )
          : "",

      equipment:
        workout.equipment.join(
          "\n"
        ),

      targetAreas:
        workout.targetAreas.join(
          "\n"
        ),

      isPublished:
        workout.isPublished,

      isFeatured:
        workout.isFeatured,
    });

    setExercises(
      workout.exercises.length
        ? workout.exercises.map(
            (exercise) => ({
              id: exercise.id,

              name:
                exercise.name,

              sets:
                exercise.sets !==
                null
                  ? String(
                      exercise.sets
                    )
                  : "",

              reps:
                exercise.reps ||
                "",

              durationSeconds:
                exercise.durationSeconds !==
                null
                  ? String(
                      exercise.durationSeconds
                    )
                  : "",

              restSeconds:
                exercise.restSeconds !==
                null
                  ? String(
                      exercise.restSeconds
                    )
                  : "",

              notes:
                exercise.notes ||
                "",
            })
          )
        : [
            {
              ...EMPTY_EXERCISE,
            },
          ]
    );

    setImageFile(null);
    setPreviewUrl(null);

    setExistingImage(
      workout.image
    );

    setSuccess("");

    document
      .getElementById(
        "workout-editor"
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  /* ═════════════════════════════════════
     SERIALIZATION
  ══════════════════════════════════════ */

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

  function createFormData() {
    const data =
      new FormData();

    data.set(
      "title",
      form.title
    );

    data.set(
      "description",
      form.description
    );

    data.set(
      "category",
      form.category
    );

    data.set(
      "difficulty",
      form.difficulty
    );

    data.set(
      "durationMinutes",
      form.durationMinutes
    );

    data.set(
      "caloriesBurned",
      form.caloriesBurned
    );

    data.set(
      "equipment",
      JSON.stringify(
        linesToArray(
          form.equipment
        )
      )
    );

    data.set(
      "targetAreas",
      JSON.stringify(
        linesToArray(
          form.targetAreas
        )
      )
    );

    data.set(
      "exercises",
      JSON.stringify(
        exercises
          .filter(
            (exercise) =>
              exercise.name.trim()
          )
          .map(
            (
              exercise,
              index
            ) => ({
              name:
                exercise.name.trim(),

              sets:
                exercise.sets ||
                null,

              reps:
                exercise.reps ||
                null,

              durationSeconds:
                exercise.durationSeconds ||
                null,

              restSeconds:
                exercise.restSeconds ||
                null,

              notes:
                exercise.notes ||
                null,

              order: index,
            })
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

  /* ═════════════════════════════════════
     SAVE
  ══════════════════════════════════════ */

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
        "Please select a workout image."
      );

      return;
    }

    const validExercises =
      exercises.filter(
        (exercise) =>
          exercise.name.trim()
      );

    if (
      validExercises.length === 0
    ) {
      setError(
        "Add at least one exercise."
      );

      return;
    }

    setIsSaving(true);

    try {
      const response =
        await fetch(
          editingId
            ? `/api/dashboard/workouts/${editingId}`
            : "/api/dashboard/workouts",
          {
            method:
              editingId
                ? "PUT"
                : "POST",

            body:
              createFormData(),
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
            "Unable to save workout."
        );
      }

      setSuccess(
        editingId
          ? "Workout updated successfully."
          : "Workout created successfully."
      );

      resetForm();

      await loadWorkouts();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save workout."
      );
    } finally {
      setIsSaving(false);
    }
  }

  /* ═════════════════════════════════════
     DELETE
  ══════════════════════════════════════ */

  async function deleteWorkout(
    workout: Workout
  ) {
    const confirmed =
      window.confirm(
        `Delete "${workout.title}"? This cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    setDeletingId(
      workout.id
    );

    setError("");
    setSuccess("");

    try {
      const response =
        await fetch(
          `/api/dashboard/workouts/${workout.id}`,
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
            "Unable to delete workout."
        );
      }

      if (
        editingId ===
        workout.id
      ) {
        resetForm();
      }

      setWorkouts(
        (current) =>
          current.filter(
            (item) =>
              item.id !==
              workout.id
          )
      );

      setSuccess(
        "Workout deleted."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete workout."
      );
    } finally {
      setDeletingId(null);
    }
  }

  const displayedImage =
    previewUrl ||
    existingImage;

  return (
    <section className="mt-16 pb-24">
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
            <Dumbbell
              size={14}
              className="text-[#B87E74]"
            />

            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B87E74]">
              Workouts
            </p>
          </div>

          <h2 className="mt-3 font-serif text-4xl text-[#28211F]">
            Workout manager
          </h2>

          <p className="mt-3 text-sm text-[#7A6C67]">
            Create, edit and
            publish Kuska Motion
            workouts.
          </p>
        </div>

        <div className="rounded-full border border-[#28211F]/10 bg-white px-4 py-2 text-xs text-[#7A6C67]">
          {workouts.length}{" "}
          {workouts.length === 1
            ? "workout"
            : "workouts"}
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
        id="workout-editor"
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
        {/* TITLE */}

        <div className="flex items-center justify-between border-b border-[#28211F]/10 px-7 py-5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#B87E74]">
              {editingId
                ? "Editing workout"
                : "New workout"}
            </p>

            <h3 className="mt-1 font-serif text-2xl">
              {editingId
                ? form.title ||
                  "Workout"
                : "Create a new workout"}
            </h3>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={
                resetForm
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#28211F]/10 transition hover:bg-[#FAF7F5]"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-[360px_1fr]">
          {/* IMAGE */}

          <div className="border-b border-[#28211F]/10 bg-[#F7F1EE] p-7 lg:border-b-0 lg:border-r">
            <p className={
              labelClass
            }>
              Workout image
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
                    src={
                      displayedImage
                    }
                    alt="Workout preview"
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
                    <ImagePlus
                      size={19}
                    />
                  </div>

                  <p className="mt-4 text-sm font-medium">
                    Upload workout image
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

          {/* FORM */}

          <div className="p-7 sm:p-9">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Workout title"
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
                      event
                        .target
                        .value
                    )
                  }
                  placeholder="Full Body Strength"
                  className={
                    inputClass
                  }
                />
              </Field>

              <Field
                label="Category"
                required
              >
                <input
                  required
                  value={
                    form.category
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "category",
                      event
                        .target
                        .value
                    )
                  }
                  placeholder="Strength"
                  className={
                    inputClass
                  }
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Description">
                <textarea
                  rows={4}
                  value={
                    form.description
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "description",
                      event
                        .target
                        .value
                    )
                  }
                  placeholder="A short introduction to this workout..."
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>

            {/* DETAILS */}

            <p className={
              sectionLabelClass
            }>
              Workout details
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                label="Difficulty"
                required
              >
                <select
                  value={
                    form.difficulty
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "difficulty",
                      event
                        .target
                        .value as WorkoutDifficulty
                    )
                  }
                  className={
                    inputClass
                  }
                >
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
                label="Duration (min)"
                value={
                  form.durationMinutes
                }
                onChange={(
                  value
                ) =>
                  updateField(
                    "durationMinutes",
                    value
                  )
                }
              />

              <NumberField
                label="Calories burned"
                value={
                  form.caloriesBurned
                }
                onChange={(
                  value
                ) =>
                  updateField(
                    "caloriesBurned",
                    value
                  )
                }
              />
            </div>

            {/* EQUIPMENT */}

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <Field
                label="Equipment"
                hint="One per line"
              >
                <textarea
                  rows={5}
                  value={
                    form.equipment
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "equipment",
                      event
                        .target
                        .value
                    )
                  }
                  placeholder={`Dumbbells\nBench\nResistance band`}
                  className={`${inputClass} resize-y`}
                />
              </Field>

              <Field
                label="Target areas"
                hint="One per line"
              >
                <textarea
                  rows={5}
                  value={
                    form.targetAreas
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "targetAreas",
                      event
                        .target
                        .value
                    )
                  }
                  placeholder={`Glutes\nLegs\nCore`}
                  className={`${inputClass} resize-y`}
                />
              </Field>
            </div>

            {/* EXERCISES */}

            <div className="mt-10 border-t border-[#28211F]/10 pt-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B87E74]">
                    Exercises
                  </p>

                  <h4 className="mt-2 font-serif text-3xl">
                    Build the session
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={
                    addExercise
                  }
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-[#28211F]/10 px-4 text-[9px] font-semibold uppercase tracking-[0.14em] transition hover:bg-[#FAF7F5]"
                >
                  <Plus
                    size={13}
                  />

                  Add exercise
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {exercises.map(
                  (
                    exercise,
                    index
                  ) => (
                    <ExerciseEditor
                      key={
                        exercise.id ||
                        index
                      }
                      exercise={
                        exercise
                      }
                      index={
                        index
                      }
                      total={
                        exercises.length
                      }
                      onChange={
                        updateExercise
                      }
                      onRemove={
                        removeExercise
                      }
                      onMove={
                        moveExercise
                      }
                    />
                  )
                )}
              </div>
            </div>

            {/* FLAGS */}

            <div className="mt-8 flex flex-wrap gap-3">
              <Toggle
                checked={
                  form.isPublished
                }
                onChange={(
                  checked
                ) =>
                  updateField(
                    "isPublished",
                    checked
                  )
                }
                label="Published"
              />

              <Toggle
                checked={
                  form.isFeatured
                }
                onChange={(
                  checked
                ) =>
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

                    Add workout
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={
                    resetForm
                  }
                  className="h-12 rounded-full border border-[#28211F]/10 px-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#7A6C67] transition hover:bg-[#FAF7F5]"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* EXISTING WORKOUTS */}

      <div className="mt-14">
        <div className="mb-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B87E74]">
            Library
          </p>

          <h3 className="mt-2 font-serif text-3xl">
            Existing workouts
          </h3>
        </div>

        {isLoading ? (
          <div className="flex min-h-[250px] items-center justify-center rounded-[28px] border border-[#28211F]/10 bg-white">
            <Loader2
              size={22}
              className="animate-spin text-[#B87E74]"
            />
          </div>
        ) : workouts.length ===
          0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center rounded-[28px] border border-dashed border-[#28211F]/15 bg-white/40 text-center">
            <Dumbbell className="text-[#B87E74]" />

            <p className="mt-4 font-serif text-2xl">
              No workouts yet.
            </p>

            <p className="mt-2 text-sm text-[#7A6C67]">
              Add your first workout
              above.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {workouts.map(
              (workout) => (
                <article
                  key={
                    workout.id
                  }
                  className="overflow-hidden rounded-[26px] border border-[#E8DDD8] bg-white"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F1E8E4]">
                    <Image
                      src={
                        workout.image
                      }
                      alt={
                        workout.title
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />

                    <div className="absolute left-4 top-4 flex gap-2">
                      <Badge>
                        {workout.isPublished
                          ? "Published"
                          : "Draft"}
                      </Badge>

                      {workout.isFeatured && (
                        <Badge>
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#B87E74]">
                        {
                          workout.category
                        }
                      </p>

                      <p className="text-[9px] uppercase tracking-[0.14em] text-[#8B7D78]">
                        {prettyDifficulty(
                          workout.difficulty
                        )}
                      </p>
                    </div>

                    <h4 className="mt-2 font-serif text-[25px] leading-tight">
                      {
                        workout.title
                      }
                    </h4>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#8B7D78]">
                      {workout.durationMinutes !==
                        null && (
                        <span>
                          {
                            workout.durationMinutes
                          }{" "}
                          min
                        </span>
                      )}

                      <span>
                        {
                          workout
                            .exercises
                            .length
                        }{" "}
                        exercises
                      </span>

                      {workout.caloriesBurned !==
                        null && (
                        <span>
                          {
                            workout.caloriesBurned
                          }{" "}
                          cal
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex gap-2 border-t border-[#EEE5E1] pt-4">
                      <button
                        type="button"
                        onClick={() =>
                          editWorkout(
                            workout
                          )
                        }
                        className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-[#28211F]/10 text-[10px] font-semibold uppercase tracking-[0.12em] transition hover:bg-[#FAF7F5]"
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
                          workout.id
                        }
                        onClick={() =>
                          void deleteWorkout(
                            workout
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-red-200 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId ===
                        workout.id ? (
                          <Loader2
                            size={14}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2
                            size={14}
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

/* ═════════════════════════════════════
   EXERCISE EDITOR
═════════════════════════════════════ */

function ExerciseEditor({
  exercise,
  index,
  total,
  onChange,
  onRemove,
  onMove,
}: {
  exercise: WorkoutExercise;
  index: number;
  total: number;

  onChange: (
    index: number,
    field: keyof WorkoutExercise,
    value: string
  ) => void;

  onRemove: (
    index: number
  ) => void;

  onMove: (
    index: number,
    direction:
      | "up"
      | "down"
  ) => void;
}) {
  return (
    <div
      className="
        rounded-[22px]
        border
        border-[#28211F]/10
        bg-[#FAF7F5]
        p-5
      "
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-[#28211F]
              font-serif
              text-sm
              text-[#E7B6AB]
            "
          >
            {index + 1}
          </span>

          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#74625C]">
            Exercise
          </p>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            disabled={
              index === 0
            }
            onClick={() =>
              onMove(
                index,
                "up"
              )
            }
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#28211F]/10 disabled:opacity-30"
          >
            <ChevronUp
              size={13}
            />
          </button>

          <button
            type="button"
            disabled={
              index ===
              total - 1
            }
            onClick={() =>
              onMove(
                index,
                "down"
              )
            }
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#28211F]/10 disabled:opacity-30"
          >
            <ChevronDown
              size={13}
            />
          </button>

          <button
            type="button"
            onClick={() =>
              onRemove(index)
            }
            className="flex h-8 w-8 items-center justify-center rounded-full border border-red-200 text-red-500 hover:bg-red-50"
          >
            <Trash2
              size={13}
            />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <Field
          label="Exercise name"
          required
        >
          <input
            required
            value={
              exercise.name
            }
            onChange={(
              event
            ) =>
              onChange(
                index,
                "name",
                event.target
                  .value
              )
            }
            placeholder="Goblet squat"
            className={
              inputClass
            }
          />
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <NumberField
          label="Sets"
          value={
            exercise.sets
          }
          onChange={(
            value
          ) =>
            onChange(
              index,
              "sets",
              value
            )
          }
        />

        <Field label="Reps">
          <input
            value={
              exercise.reps
            }
            onChange={(
              event
            ) =>
              onChange(
                index,
                "reps",
                event.target
                  .value
              )
            }
            placeholder="10–12"
            className={
              inputClass
            }
          />
        </Field>

        <NumberField
          label="Duration (sec)"
          value={
            exercise.durationSeconds
          }
          onChange={(
            value
          ) =>
            onChange(
              index,
              "durationSeconds",
              value
            )
          }
        />

        <NumberField
          label="Rest (sec)"
          value={
            exercise.restSeconds
          }
          onChange={(
            value
          ) =>
            onChange(
              index,
              "restSeconds",
              value
            )
          }
        />
      </div>

      <div className="mt-4">
        <Field label="Notes">
          <textarea
            rows={2}
            value={
              exercise.notes
            }
            onChange={(
              event
            ) =>
              onChange(
                index,
                "notes",
                event.target
                  .value
              )
            }
            placeholder="Keep your chest tall and control the descent..."
            className={`${inputClass} resize-none`}
          />
        </Field>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════
   UI HELPERS
═════════════════════════════════════ */

const inputClass = `
  w-full
  rounded-[14px]
  border
  border-[#28211F]/10
  bg-white
  px-4
  py-3.5
  text-[14px]
  text-[#28211F]
  outline-none
  transition
  placeholder:text-[#9A8983]/50
  focus:border-[#D8A399]
  focus:ring-4
  focus:ring-[#D8A399]/10
`;

const labelClass =
  "text-[10px] font-medium uppercase tracking-[0.16em] text-[#74625C]";

const sectionLabelClass =
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
  children:
    React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span
          className={
            labelClass
          }
        >
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

  onChange: (
    value: string
  ) => void;
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
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (
    value: boolean
  ) => void;
  label: string;
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
        {checked && (
          <Check
            size={10}
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
  children:
    React.ReactNode;
}) {
  return (
    <span className="rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-xl">
      {children}
    </span>
  );
}

function prettyDifficulty(
  difficulty: WorkoutDifficulty
) {
  switch (
    difficulty
  ) {
    case "BEGINNER":
      return "Beginner";

    case "INTERMEDIATE":
      return "Intermediate";

    case "ADVANCED":
      return "Advanced";
  }
}