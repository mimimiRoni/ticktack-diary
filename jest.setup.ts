import "@testing-library/jest-dom";
import "whatwg-fetch";

jest.mock("next/navigation", () => jest.requireActual("next-router-mock"));
