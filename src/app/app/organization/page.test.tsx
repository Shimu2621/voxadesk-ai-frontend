import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OrganizationPage from "./page";

const create = vi.fn(() => ({ unwrap: () => Promise.resolve({}) }));
vi.mock("@/lib/voxadesk-api", () => ({
  useGetOrganizationQuery: () => ({
    data: { data: { timezone: "UTC", locations: [] } },
    isLoading: false,
  }),
  useGetSessionQuery: () => ({ data: { data: { role: "MANAGER" } } }),
  useCreateLocationMutation: () => [create, { isLoading: false }],
  useUpdateLocationMutation: () => [vi.fn(), { isLoading: false }],
}));

describe("location management", () => {
  it("creates a location with validated weekly hours", async () => {
    render(<OrganizationPage />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Main office" },
    });
    fireEvent.change(screen.getByLabelText("monday open"), {
      target: { value: "09:00" },
    });
    fireEvent.change(screen.getByLabelText("monday close"), {
      target: { value: "17:00" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save location" }));
    await waitFor(() =>
      expect(create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Main office",
          timezone: "UTC",
          hoursJson: expect.objectContaining({
            monday: [{ open: "09:00", close: "17:00" }],
          }),
        }),
      ),
    );
  });
});
