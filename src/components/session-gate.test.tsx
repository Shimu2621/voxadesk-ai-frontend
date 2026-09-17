import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SessionGate } from "./session-gate";

const { replace, useGetSessionQuery } = vi.hoisted(() => ({
  replace: vi.fn(),
  useGetSessionQuery: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  usePathname: () => "/app/calls",
  useRouter: () => ({ replace }),
}));
vi.mock("@/lib/voxadesk-api", () => ({ useGetSessionQuery }));

describe("SessionGate", () => {
  beforeEach(() => {
    replace.mockReset();
    useGetSessionQuery.mockReset();
  });

  it("restores a valid session before rendering protected content", () => {
    useGetSessionQuery.mockReturnValue({ isLoading: false, isError: false });
    render(
      <SessionGate>
        <p>Protected workspace</p>
      </SessionGate>,
    );
    expect(screen.getByText("Protected workspace")).toBeInTheDocument();
  });

  it("redirects when session restoration fails", async () => {
    useGetSessionQuery.mockReturnValue({ isLoading: false, isError: true });
    render(
      <SessionGate>
        <p>Protected workspace</p>
      </SessionGate>,
    );
    await waitFor(() =>
      expect(replace).toHaveBeenCalledWith("/login?next=%2Fapp%2Fcalls"),
    );
    expect(screen.queryByText("Protected workspace")).not.toBeInTheDocument();
  });
});
