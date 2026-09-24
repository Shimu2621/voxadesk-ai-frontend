import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OrganizationPage from "./page";

const create = vi.fn(() => ({ unwrap: () => Promise.resolve({}) }));
const update = vi.fn(() => ({ unwrap: () => Promise.resolve({}) }));
const location = {
  id: "location-1",
  name: "Existing office",
  timezone: "America/New_York",
  phone: "+15550101000",
  hoursJson: {
    monday: [{ open: "08:00", close: "16:00" }],
  },
  closuresJson: [{ date: "2030-12-25", label: "Holiday" }],
};
vi.mock("@/lib/voxadesk-api", () => ({
  useGetOrganizationQuery: () => ({
    data: { data: { timezone: "UTC", locations: [location] } },
    isLoading: false,
  }),
  useGetSessionQuery: () => ({ data: { data: { role: "MANAGER" } } }),
  useCreateLocationMutation: () => [create, { isLoading: false }],
  useUpdateLocationMutation: () => [update, { isLoading: false }],
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

  it("edits a location and accepts an omitted optional closure", async () => {
    render(<OrganizationPage />);
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    expect(screen.getByLabelText("Name")).toHaveValue("Existing office");
    expect(screen.getByLabelText("monday open")).toHaveValue("08:00");
    fireEvent.change(screen.getByLabelText("Closure date"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText("Closure label"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save location" }));
    await waitFor(() =>
      expect(update).toHaveBeenCalledWith({
        id: "location-1",
        body: expect.objectContaining({
          name: "Existing office",
          closuresJson: [],
          hoursJson: expect.objectContaining({
            monday: [{ open: "08:00", close: "16:00" }],
          }),
        }),
      }),
    );
  });
});
