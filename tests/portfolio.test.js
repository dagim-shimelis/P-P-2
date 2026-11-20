import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Portfolio Website", () => {
  it("should load the homepage and display key sections", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://dagim.codes" });

    const heroHeading = await testdriver.find("hero heading with Good design");
    expect(heroHeading).toBeDefined();

    const assertResult = await testdriver.assert("the portfolio homepage is visible with hero and navigation");
    expect(assertResult).toBeTruthy();
  });

  it("should navigate to selected work and display projects", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://dagim.codes" });

    const workLink = await testdriver.find("Work navigation link");
    await workLink.click();

    const assertResult = await testdriver.assert("the projects list page is visible with project items and filters");
    expect(assertResult).toBeTruthy();
  });
});
