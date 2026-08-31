import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthForm } from "./auth-form";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh: vi.fn() }),
}));

describe("AuthForm", () => {
  beforeEach(() => {
    push.mockReset();
    vi.unstubAllGlobals();
  });

  it("submits signup fields to the backend and redirects", async () => {
    const request = vi
      .fn()
      .mockResolvedValue(
        new Response(
          JSON.stringify({ data: { organization: { id: "org" } } }),
          { status: 201 },
        ),
      );
    vi.stubGlobal("fetch", request);
    render(<AuthForm mode="signup" footer={null} />);
    fireEvent.change(screen.getByLabelText("Full name"), {
      target: { value: "Avery Owner" },
    });
    fireEvent.change(screen.getByLabelText("Organization name"), {
      target: { value: "BrightPath" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "owner@example.test" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "correct-horse-battery" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create account" }));
    await waitFor(() => expect(request).toHaveBeenCalledOnce());
    expect(push).toHaveBeenCalledWith("/app");
  });

  it("shows a safe API error", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(
            JSON.stringify({ message: "Email or password is incorrect." }),
            { status: 401 },
          ),
        ),
    );
    render(<AuthForm mode="login" footer={null} />);
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "owner@example.test" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrong-password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Email or password is incorrect.",
    );
  });
});
