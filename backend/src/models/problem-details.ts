export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  errors?: Record<string, string[]>;
}

export function createProblemDetails(
  status: number,
  title: string,
  detail: string,
  instance: string,
  type = 'https://autocheck.app/problems/error',
  errors?: Record<string, string[]>
): ProblemDetails {
  const problem: ProblemDetails = {
    type,
    title,
    status,
    detail,
    instance,
  };
  if (errors) {
    problem.errors = errors;
  }
  return problem;
}
