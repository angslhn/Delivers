import { ZodError } from "zod";

export default function parseErrors(zodErrors: ZodError) {
  const zodIssues = zodErrors.issues;

  const errors = zodIssues.reduce(
    (acc, issue) => {
      const field = issue.path[0] as string;
      const message = issue.message;

      if (!acc[field]) {
        acc[field] = message;
      }

      return acc;
    },
    {} as Record<string, string>
  );

  return errors;
}
