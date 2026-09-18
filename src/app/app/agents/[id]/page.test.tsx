import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AgentDetail } from "./page";

const duplicate = vi.fn(() => ({
  unwrap: () => Promise.resolve({ data: { id: "copy-id" } }),
}));
const archive = vi.fn(() => ({ unwrap: () => Promise.resolve({}) }));
const rollback = vi.fn(() => ({ unwrap: () => Promise.resolve({}) }));
const push = vi.fn();
const { navigationState } = vi.hoisted(() => ({
  navigationState: { query: "" },
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams(navigationState.query),
}));
vi.mock("@/lib/voxadesk-api", () => ({
  useGetAgentQuery: () => ({
    data: {
      data: {
        id: "agent-1",
        name: "Receptionist",
        status: "PUBLISHED",
        draftConfig: {
          name: "Receptionist",
          greeting: "Hello there",
          voiceId: "voice",
          timezone: "UTC",
          languages: ["en-US"],
          tone: "helpful",
          role: "Receptionist",
          pace: 1,
          interruptible: true,
          pronunciation: [],
          disclosure: "AI disclosure",
          transferNumbers: [],
          channels: { phone: true, webVoice: true, webText: true },
          promptSections: {
            objectives: "Help",
            workflow: "Ask",
            safety: "Safe",
            prohibitedActions: "None",
          },
          unknownFallback: "Arrange a callback",
        },
        activeVersion: { id: "version-2", version: 2 },
        versions: [
          {
            id: "version-2",
            version: 2,
            publishedAt: "2026-01-02T00:00:00Z",
            config: {},
          },
          {
            id: "version-1",
            version: 1,
            publishedAt: "2026-01-01T00:00:00Z",
            config: {},
          },
        ],
      },
    },
    isLoading: false,
  }),
  useGetSessionQuery: () => ({ data: { data: { role: "OWNER" } } }),
  useUpdateAgentMutation: () => [vi.fn(), { isLoading: false }],
  useDuplicateAgentMutation: () => [duplicate, { isLoading: false }],
  useArchiveAgentMutation: () => [archive, { isLoading: false }],
  useRollbackAgentMutation: () => [rollback, { isLoading: false }],
}));

describe("agent management", () => {
  it("duplicates, rolls back, and confirms archive", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<AgentDetail id="agent-1" />);
    fireEvent.click(screen.getByRole("button", { name: "Duplicate agent" }));
    await waitFor(() =>
      expect(push).toHaveBeenCalledWith("/app/agents/copy-id?duplicated=1"),
    );
    expect(screen.getByRole("button", { name: "Duplicating…" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Roll back" }));
    await waitFor(() =>
      expect(rollback).toHaveBeenCalledWith({
        id: "agent-1",
        versionId: "version-1",
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Archive agent" }));
    await waitFor(() => expect(archive).toHaveBeenCalledWith("agent-1"));
  });

  it("shows duplication success feedback after navigation", () => {
    navigationState.query = "duplicated=1";
    render(<AgentDetail id="copy-id" />);
    expect(
      screen.getByText(
        "Agent duplicated successfully. You are now editing the new copy.",
      ),
    ).toBeInTheDocument();
    navigationState.query = "";
  });
});
