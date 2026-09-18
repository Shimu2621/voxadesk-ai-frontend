import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CatalogPage from "./page";

const saveService = vi.fn(() => ({ unwrap: () => Promise.resolve({}) }));
const deleteFaq = vi.fn(() => ({ unwrap: () => Promise.resolve() }));
vi.mock("@/lib/voxadesk-api", () => ({
  useGetServicesQuery: () => ({ data: { data: [] }, isLoading: false }),
  useGetFaqsQuery: () => ({
    data: {
      data: [
        { id: "faq-1", question: "When?", answer: "Always", active: true },
      ],
    },
    isLoading: false,
  }),
  useGetSessionQuery: () => ({ data: { data: { role: "MANAGER" } } }),
  useSaveServiceMutation: () => [saveService, { isLoading: false }],
  useDeleteServiceMutation: () => [vi.fn(), {}],
  useSaveFaqMutation: () => [vi.fn(), { isLoading: false }],
  useDeleteFaqMutation: () => [deleteFaq, {}],
}));

describe("catalog management", () => {
  it("creates services and confirms FAQ deactivation", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<CatalogPage />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Consultation" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save service" }));
    await waitFor(() => expect(saveService).toHaveBeenCalled());
    fireEvent.click(screen.getAllByRole("button", { name: "Deactivate" })[0]);
    await waitFor(() => expect(deleteFaq).toHaveBeenCalledWith("faq-1"));
  });
});
