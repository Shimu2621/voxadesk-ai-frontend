import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppShell } from "./app-shell";

const { replace, refresh, logout, session } = vi.hoisted(() => ({
  replace: vi.fn(),
  refresh: vi.fn(),
  logout: vi.fn(() => ({ unwrap: () => Promise.resolve() })),
  session: { role: "OWNER" },
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace, refresh }),
  usePathname: () => "/app",
}));
vi.mock("@/lib/voxadesk-api", () => ({
  useGetSessionQuery: () => ({
    data: {
      data: { user: { email: "owner@example.test" }, role: session.role },
    },
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

  it("hides owner navigation from viewers", () => {
    session.role = "VIEWER";
    render(
      <AppShell>
        <p>Workspace</p>
      </AppShell>,
    );
    expect(
      screen.queryByRole("link", { name: /Team/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Operations/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Settings/ }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Calls/ })).toBeInTheDocument();
    session.role = "OWNER";
  });
});
