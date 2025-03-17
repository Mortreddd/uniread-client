import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  mockedAxios.post.mockReset();
});

interface LoginProps {
  email: string;
  password: string;
}

interface LoginResponseProps {
  access_token: string;
  token_type: string;
  expires_in: number;
}
describe("Login Test", () => {
  it("should receive token", function () {
    const data: LoginProps = {
      email: "emmanuelmale@gmail.com",
      password: "12345678",
    };

    mockedAxios
      .post("http://localhost:8000/api/v1/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        params: data,
      })
      .then((response) => {
        const responseData: LoginResponseProps = response.data;
        expect(responseData.access_token).not.toBeNull();
      });
  }, 30000);
});
