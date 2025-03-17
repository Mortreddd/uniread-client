describe("Token Test", () => {
  it("should receive token", function () {
    expect(localStorage.getItem("token")).toBeNull();

    localStorage.setItem(
      "token",
      JSON.stringify({
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3MjI0MjY4NjcsImV4cCI6MTcyMjQzMDQ2NywibmJmIjoxNzIyNDI2ODY3LCJqdGkiOiJST0M4SmFLeU9oV1JZOTM4Iiwic3ViIjoiMSJ9.z7jOxWnPCcH9O_cgTbhLqftASJoFTSpa-XLC9xsWTEM",
      })
    );

    expect(localStorage.getItem("token")).toBe(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3MjI0MjY4NjcsImV4cCI6MTcyMjQzMDQ2NywibmJmIjoxNzIyNDI2ODY3LCJqdGkiOiJST0M4SmFLeU9oV1JZOTM4Iiwic3ViIjoiMSJ9.z7jOxWnPCcH9O_cgTbhLqftASJoFTSpa-XLC9xsWTEM"
    );
  });
});
