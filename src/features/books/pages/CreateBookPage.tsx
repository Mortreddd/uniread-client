import { CheckIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { FieldPath, FormProvider, useForm } from "react-hook-form";
import Step1Form, { Step1Data } from "../components/steps/Step1Form";
import Step2Form, { Step2Data } from "../components/steps/Step2Form";
import { cn } from "@/utils/ClassNames";
import { Button } from "@/shared/components/form/Button";
import { AnimatePresence, motion } from "motion/react";
import Step3Form, { Step3Data } from "../components/steps/Step3Form";
import Step4Form from "../components/steps/Step4Form";
import { ModalRef } from "@/shared/components/Modal";
import CreateBookConfirmationModal from "../components/modals/CreateBookConfirmationModal";
import { useCreateBookMutation } from "../hooks/useBook";
import { useNavigate } from "react-router-dom";

const FORM_STEPS = [
  {
    id: 1,
    title: "Basic Info & Cover",
    shortTitle: "Basic Info",
    description: "Folio Art",
    fields: ["cover"],
    component: <Step1Form />,
  },
  {
    id: 2,
    title: "Categorization & Tags",
    shortTitle: "Categories",
    description: "Title, blurb, genres & tags",
    fields: ["title", "description", "status", "matured", "genres"],
    component: <Step2Form />,
  },
  {
    id: 3,
    title: "Contributors & Rights",
    shortTitle: "Contributors",
    description: "Co-authors & copyright",
    fields: ["collaborators"],
    component: <Step3Form />,
  },
  {
    id: 4,
    title: "Review",
    shortTitle: "Review",
    description: "Final check",
    fields: [""],
    component: <Step4Form />,
  },
] as const;

export interface CreateBookRequest extends Step1Data, Step2Data, Step3Data {}

export default function CreateBook() {
  const [step, setStep] = useState<number>(1);
  const confirmModalRef = useRef<ModalRef>(null);
  const createBookMutation = useCreateBookMutation();
  const navigate = useNavigate();
  const methods = useForm<CreateBookRequest>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      cover: null,
      genres: [],
      matured: false,
      tags: [],
      collaborators: [],
    },
  });

  async function prevStep() {
    if (step === 1) return;

    setStep(step - 1);
  }

  async function nextStep() {
    if (step === 4) {
      const valid = await methods.trigger(undefined, { shouldFocus: true });
      if (!valid) return;
      confirmModalRef.current?.open?.();
      return;
    }

    const stepConfig = FORM_STEPS.find((s) => s.id === step);
    const fields = (stepConfig?.fields ?? []) as FieldPath<CreateBookRequest>[];

    const valid = await methods.trigger(fields, { shouldFocus: true });
    if (!valid) return;

    setStep((s) => s + 1);
  }

  async function submitBook(data: CreateBookRequest) {
    const formData = new FormData();
    if (data.cover) formData.append("cover", data.cover);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("matured", String(data.matured));
    data.genres.forEach((g) => formData.append("genres", g.id));
    data.tags?.forEach((t) => formData.append("tags", t));
    data.collaborators?.forEach((c) => formData.append("collaborators", c));

    await createBookMutation.mutateAsync(formData);
    confirmModalRef.current?.close?.();
    navigate("/dashboard/books", { replace: true });
  }

  const onSubmit = methods.handleSubmit(submitBook);

  return (
    <>
      <AnimatePresence mode="wait">
        <FormProvider {...methods}>
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
            className="size-full overflow-y-auto max-w-full"
          >
            <div className="mb-1 md:mb-1.5">
              <h1 className="text-lg md:text-xl lg:text-2xl font-sans font-medium tracking-light text-gray-800 dark:text-gray-200">
                Book Creation Wizard
              </h1>
              <div className="flex flex-col lg:flex-row items-start justify-start lg:items-center gap-3 lg:gap-0 lg:justify-between mb-2 md:mb-3">
                <p className="text-gray-700 dark:text-gray-300 font-thin font-sans text-xs md:text-sm lg:text-base">
                  Review all manuscripts metadata, licensing, and distribution
                  parameters prior to global release.
                </p>
              </div>
              <div className="mb-4 lg:mb-5">
                <StepSection currentStep={step} />
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                  }}
                  className="relative mb-4 lg:mb-5"
                >
                  {FORM_STEPS.find(({ id }) => id === step)?.component}
                </motion.div>
              </AnimatePresence>
              <div className="relative flex items-center justify-end gap-2 lg:gap-3 transition-all duration-200 ease-in-out">
                <Button
                  variant={"secondary"}
                  onClick={prevStep}
                  disabled={step === 1}
                  className={"rounded"}
                >
                  <span
                    className={"font-sans text-gray-100 text-tiny md:text-xs"}
                  >
                    Previous
                  </span>
                </Button>
                {step === 4 ? (
                  <Button onClick={nextStep} className={"rounded"}>
                    <span
                      className={"font-sans text-gray-100 text-tiny md:text-xs"}
                    >
                      Submit
                    </span>
                  </Button>
                ) : (
                  <Button onClick={nextStep} className={"rounded"}>
                    <span
                      className={"font-sans text-gray-100 text-tiny md:text-xs"}
                    >
                      Next
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </FormProvider>
      </AnimatePresence>
      <CreateBookConfirmationModal ref={confirmModalRef} onConfirm={onSubmit} />
    </>
  );
}

type StepStatus = "completed" | "current" | "upcoming";

interface StepSectionProps {
  currentStep: number;
}
interface StepSectionProps {
  currentStep: number;
}
function getStepStatus(step: number, currentStep: number): StepStatus {
  if (step < currentStep) {
    return "completed";
  }
  if (step === currentStep) {
    return "current";
  }
  return "upcoming";
}

function StepIndicator({ step, status }: { step: number; status: StepStatus }) {
  return (
    <motion.div
      layout
      initial={false}
      animate={{
        scale: status === "current" ? 1.05 : 1,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full",
        "size-6 sm:size-7 lg:size-8",
        "text-[10px] sm:text-xs lg:text-sm",

        status === "completed" &&
          "border border-green-600 bg-green-200 text-green-800",

        status === "current" && "border border-primary bg-primary text-white",

        status === "upcoming" &&
          "border border-gray-300 bg-transparent text-gray-600",

        "dark:border-slate-600 dark:text-gray-300",

        status === "current" &&
          "dark:border-primary-dark dark:bg-primary-dark dark:text-white",

        status === "completed" &&
          "dark:border-green-600 dark:bg-green-900/30 dark:text-green-400",
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "completed" ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            <CheckIcon className="size-3 sm:size-3.5 lg:size-4" />
          </motion.div>
        ) : (
          <motion.span
            key="number"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            {step}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
function StepStatus({ step, status }: { step: number; status: StepStatus }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={status}
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -2 }}
        transition={{ duration: 0.15 }}
        className={cn(
          "flex items-center gap-0.5",
          status === "completed" && "text-green-800 dark:text-green-400",
          status === "upcoming" && "text-gray-500 dark:text-gray-400",
          status === "current" && "text-primary dark:text-primary-dark",
        )}
      >
        {status === "current" ? (
          <span className="font-semibold">Current</span>
        ) : (
          <>
            <span>Step {step}</span>
            <span>•</span>
            <span>{status === "completed" ? "Done" : "Not completed"}</span>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export function StepSection({ currentStep }: StepSectionProps) {
  return (
    <section
      className={cn(
        "w-full rounded-lg",
        "bg-gray-100 dark:bg-slate-800",
        "p-2 sm:p-3 lg:p-5",
      )}
    >
      <div className="grid grid-cols-4 gap-1 sm:gap-2 lg:gap-4">
        {FORM_STEPS.map(({ id, title, shortTitle, description }) => {
          const status = getStepStatus(id, currentStep);

          return (
            <div key={id} className="min-w-0">
              <div className="flex items-center">
                <StepIndicator step={id} status={status} />

                {id !== FORM_STEPS.length && (
                  <div
                    className={cn(
                      "mx-1 h-px flex-1 sm:mx-2 lg:mx-3",
                      id < currentStep
                        ? "bg-green-500"
                        : "bg-gray-300 dark:bg-slate-600",
                    )}
                  />
                )}
              </div>

              <div className="mt-1.5 min-w-0 sm:mt-2 lg:mt-3">
                <div
                  className={cn(
                    "hidden text-[9px] sm:block sm:text-[10px] lg:text-xs",
                    status === "current" &&
                      "text-primary dark:text-primary-dark",
                    status === "completed" &&
                      "text-green-800 dark:text-green-400",
                    status === "upcoming" && "text-gray-500 dark:text-gray-400",
                  )}
                >
                  <StepStatus step={id} status={status} />
                </div>

                <p
                  className={cn(
                    "truncate font-newsreader font-medium",
                    "text-[10px] sm:hidden",
                    status === "current" &&
                      "text-primary dark:text-primary-dark",
                    status !== "current" && "text-gray-800 dark:text-gray-100",
                  )}
                >
                  {shortTitle}
                </p>

                <p
                  className={cn(
                    "hidden truncate font-newsreader font-medium sm:block",
                    "text-xs lg:text-sm",
                    status === "current" &&
                      "text-primary font-medium dark:text-primary-dark",
                    status !== "current" && "text-gray-800 dark:text-gray-100",
                  )}
                >
                  {title}
                </p>

                <p
                  className={cn(
                    "hidden truncate font-newsreader font-thin",
                    "text-gray-600 dark:text-gray-400",
                    "lg:block lg:text-tiny",
                  )}
                >
                  {description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
