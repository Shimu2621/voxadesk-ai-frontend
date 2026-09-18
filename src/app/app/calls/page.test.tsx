import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Page from "./page";

const query = vi.fn();
vi.mock("@/lib/voxadesk-api", () => ({
  useGetConversationsQuery: (args: unknown) => query(args),
}));

describe("conversation pagination", () => {
  it("requests the next cursor and returns to the previous page", () => {
    query.mockImplementation((args: { cursor?: string }) => ({
      data: { data: [], nextCursor: args.cursor ? null : "next-page" },
      isLoading: false,
      isFetching: false,
    }));
    render(<Page />);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(query).toHaveBeenLastCalledWith({ cursor: "next-page", limit: 10 });
    expect(screen.getByText("Page 2")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(query).toHaveBeenLastCalledWith({ cursor: undefined, limit: 10 });
  });
});
