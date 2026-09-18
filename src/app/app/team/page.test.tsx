import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TeamPage from "./page";

const cancel = vi.fn(() => ({ unwrap: () => Promise.resolve() }));
const updateRole = vi.fn(() => ({ unwrap: () => Promise.resolve() }));
vi.mock("@/lib/voxadesk-api", () => ({
  useGetTeamQuery: () => ({
    data: {
      data: {
        members: [
          {
            id: "member-1",
            role: "VIEWER",
            user: { id: "user-2", email: "member@example.test" },
          },
        ],
        invitations: [
          {
            id: "invite-1",
            email: "invite@example.test",
            role: "OPERATOR",
            expiresAt: "2030-01-01T00:00:00Z",
          },
        ],
      },
    },
    isLoading: false,
  }),
  useGetSessionQuery: () => ({
    data: { data: { user: { id: "owner-1" }, role: "OWNER" } },
  }),
  useInviteMemberMutation: () => [vi.fn(), { isLoading: false }],
  useCancelInvitationMutation: () => [cancel, {}],
  useUpdateMemberRoleMutation: () => [updateRole, {}],
  useRemoveMemberMutation: () => [vi.fn(), {}],
}));

describe("team administration", () => {
  it("changes roles and confirms invitation cancellation", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<TeamPage />);
    fireEvent.change(screen.getByLabelText("Role"), {
      target: { value: "OPERATOR" },
    });
    await waitFor(() =>
      expect(updateRole).toHaveBeenCalledWith({
        id: "member-1",
        role: "OPERATOR",
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel invitation" }));
    await waitFor(() => expect(cancel).toHaveBeenCalledWith("invite-1"));
  });
});
