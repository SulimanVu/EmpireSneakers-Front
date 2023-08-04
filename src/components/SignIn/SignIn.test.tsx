import { render, screen, waitFor } from "@testing-library/react";
import SignIn from "./SignIn";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";
import { renderHook } from "@testing-library/react";
import { useState } from "react";

describe("SignIn Component", () => {
  it("SignIn renders", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  // Проверка работы худа useState
  it("SignIn name input works", () => {
    const { result } = renderHook(() => useState("Alice"));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );

    expect(result.current[0]).toBe("Alice");
  });
});
