import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthLifecycleForm } from "./auth-lifecycle-form";

const push = vi.fn();
const verify = vi.fn();
const forgot = vi.fn();
const reset = vi.fn();
const accept = vi.fn();
const mutation = (fn: typeof verify) => [fn, { isLoading: false }] as const;

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock("@/lib/voxadesk-api", () => ({
  useVerifyEmailMutation: () => mutation(verify),
  useForgotPasswordMutation: () => mutation(forgot),
  useResetPasswordMutation: () => mutation(reset),
  useAcceptInvitationMutation: () => mutation(accept),
}));

const result = (value?: unknown) => ({ unwrap: () => Promise.resolve(value) });

describe("authentication lifecycle forms", () => {
  beforeEach(() => {
    push.mockReset();
    verify.mockReset();
    forgot.mockReset();
    reset.mockReset();
    accept.mockReset();
  });

  it("verifies an email token", async () => {
    verify.mockReturnValue(result());
    render(<AuthLifecycleForm flow="verify" />);
    fireEvent.change(screen.getByLabelText("One-time token"), {
      target: { value: "v".repeat(32) },
    });
    fireEvent.click(screen.getByRole("button", { name: "Verify your email" }));
    expect(
      await screen.findByText("Email verified. You can now log in."),
    ).toBeInTheDocument();
  });

  it("requests a password reset without revealing account existence", async () => {
    forgot.mockReturnValue(
      result({
        message: "If the account exists, reset instructions were sent.",
      }),
    );
    render(<AuthLifecycleForm flow="forgot" />);
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "person@example.test" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Reset your password" }),
    );
    expect(
      await screen.findByText(/If the account exists/),
    ).toBeInTheDocument();
  });

  it("submits a new password", async () => {
    reset.mockReturnValue(result());
    render(<AuthLifecycleForm flow="reset" />);
    fireEvent.change(screen.getByLabelText("One-time token"), {
      target: { value: "r".repeat(32) },
    });
    fireEvent.change(screen.getByLabelText("New password"), {
      target: { value: "new-password-123" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Choose a new password" }),
    );
    expect(
      await screen.findByText("Password updated. You can now log in."),
    ).toBeInTheDocument();
  });

  it("accepts a new-user invitation and enters the workspace", async () => {
    accept.mockReturnValue(
      result({ data: { organizationId: "org", requiresLogin: false } }),
    );
    render(<AuthLifecycleForm flow="invitation" />);
    fireEvent.change(screen.getByLabelText("One-time token"), {
      target: { value: "i".repeat(32) },
    });
    fireEvent.change(screen.getByLabelText("Name (new users)"), {
      target: { value: "Invited User" },
    });
    fireEvent.change(screen.getByLabelText("Password (new users)"), {
      target: { value: "new-password-123" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Accept your invitation" }),
    );
    await waitFor(() => expect(push).toHaveBeenCalledWith("/app"));
  });
});
