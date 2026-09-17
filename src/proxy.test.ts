import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "./proxy";

describe("app route protection", () => {
  it("redirects an unauthenticated app request to login", () => {
    const response = proxy(
      new NextRequest("http://localhost/app/calls?open=1"),
    );
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/login?next=%2Fapp%2Fcalls%3Fopen%3D1",
    );
  });

  it("allows a request with a session cookie to continue", () => {
    const request = new NextRequest("http://localhost/app", {
      headers: { cookie: "voxadesk_session=opaque-session" },
    });
    expect(proxy(request).headers.get("x-middleware-next")).toBe("1");
  });
});
