import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppShell } from "./app-shell";

const replace = vi.fn();
const refresh = vi.fn();
const logout = vi.fn(() => ({ unwrap: () => Promise.resolve() }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace, refresh }),
}));
vi.mock("@/lib/voxadesk-api", () => ({
  useGetSessionQuery: () => ({
    data: { data: { user: { email: "owner@example.test" } } },
  }),
  useLogoutMutation: () => [logout, { isLoading: false }],
}));

describe("AppShell logout", () => {
  it("logs out and returns to login", async () => {
    render(
      <AppShell>
        <p>Workspace</p>
      </AppShell>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Log out" }));
    await waitFor(() => expect(logout).toHaveBeenCalledOnce());
    expect(replace).toHaveBeenCalledWith("/login");
    expect(refresh).toHaveBeenCalledOnce();
  });
});
