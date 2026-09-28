"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProblemDetails = createProblemDetails;
function createProblemDetails(status, title, detail, instance, type = 'https://autocheck.app/problems/error', errors) {
    const problem = {
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
