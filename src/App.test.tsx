import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders form elements correctly", () => {
  render(<App />);
  const title = screen.getByText(/Delivery Fee Calculator/i);
  const cartValueInputLabel = screen.getByText(/Cart value/i);
  const deliveryDistanceInputLabel = screen.getByText(/Delivery Distance/i);
  const amountOfItemsInputLabel = screen.getByText(/Amount of items/i);
  const dateTimePickerLabel = screen.getByText("Time(UTC)");

  const cartValueInput = screen.getByTestId("cart-value");
  const deliveryDistanceInput = screen.getByTestId("delivery-distance");
  const amountOfItemsInput = screen.getByTestId("amount-of-items");

  expect(cartValueInput).toBeInTheDocument();
  expect(deliveryDistanceInput).toBeInTheDocument();
  expect(amountOfItemsInput).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(cartValueInputLabel).toBeInTheDocument();
  expect(deliveryDistanceInputLabel).toBeInTheDocument();
  expect(amountOfItemsInputLabel).toBeInTheDocument();
  expect(dateTimePickerLabel).toBeInTheDocument();
  expect(screen.getByText(/Calculate Delivery Price/i)).toHaveAttribute(
    "disabled"
  );
});

test("input values and calculate delivery price", async () => {
  render(<App />);
  const cartValueInput = screen.getByPlaceholderText("cart value in euros");
  const deliveryDistanceInput =
    screen.getByPlaceholderText("distance in meters");
  const amountOfItems = screen.getByPlaceholderText("number of items");

  fireEvent.change(cartValueInput, { target: { value: "42.00" } });
  fireEvent.change(deliveryDistanceInput, { target: { value: "1000" } });
  fireEvent.change(amountOfItems, { target: { value: "4" } });

  expect(cartValueInput).toHaveValue("42.00");
  expect(deliveryDistanceInput).toHaveValue("1000");
  expect(amountOfItems).toHaveValue("4");
  expect(screen.getByText(/Calculate Delivery Price/i)).not.toHaveAttribute(
    "disabled"
  );

  fireEvent.click(screen.getByText(/Calculate Delivery Price/i));

  const cartValueDetails = screen.getByTestId("cart-value-details");
  const distanceDetails = screen.getByTestId("distance-details");
  const itemDetails = screen.getByTestId("item-details");
  const deliveryFee = screen.getByTestId("delivery-fee");

  expect(cartValueDetails).toBeInTheDocument();
  expect(distanceDetails).toBeInTheDocument();
  expect(itemDetails).toBeInTheDocument();
  expect(deliveryFee).toBeInTheDocument();
  expect(cartValueDetails).toHaveTextContent("Cart value: 42.00€");
  expect(distanceDetails).toHaveTextContent("1000 meters");
  expect(itemDetails).toHaveTextContent("4 items");
  expect(deliveryFee).toHaveTextContent("2€");
});

test("Delivery fee is 0 if cart value is more than 100 €", async () => {
  render(<App />);
  const cartValueInput = screen.getByPlaceholderText("cart value in euros");
  const deliveryDistanceInput =
    screen.getByPlaceholderText("distance in meters");
  const amountOfItems = screen.getByPlaceholderText("number of items");

  fireEvent.change(cartValueInput, { target: { value: "101.00" } });
  fireEvent.change(deliveryDistanceInput, { target: { value: "1000" } });
  fireEvent.change(amountOfItems, { target: { value: "4" } });

  expect(cartValueInput).toHaveValue("101.00");
  expect(deliveryDistanceInput).toHaveValue("1000");
  expect(amountOfItems).toHaveValue("4");
  expect(screen.getByText(/Calculate Delivery Price/i)).not.toHaveAttribute(
    "disabled"
  );

  fireEvent.click(screen.getByText(/Calculate Delivery Price/i));

  const cartValueDetails = screen.getByTestId("cart-value-details");
  const distanceDetails = screen.getByTestId("distance-details");
  const itemDetails = screen.getByTestId("item-details");
  const deliveryFee = screen.getByTestId("delivery-fee");

  expect(cartValueDetails).toBeInTheDocument();
  expect(distanceDetails).toBeInTheDocument();
  expect(itemDetails).toBeInTheDocument();
  expect(deliveryFee).toBeInTheDocument();
  expect(cartValueDetails).toHaveTextContent("Cart value: 101.00€");
  expect(distanceDetails).toHaveTextContent("1000 meters");
  expect(itemDetails).toHaveTextContent("4 items");
  expect(deliveryFee).toHaveTextContent("0€");
});

test("Delivery fee does not exceed 15€ in any case", async () => {
  render(<App />);
  const cartValueInput = screen.getByPlaceholderText("cart value in euros");
  const deliveryDistanceInput =
    screen.getByPlaceholderText("distance in meters");
  const amountOfItems = screen.getByPlaceholderText("number of items");

  fireEvent.change(cartValueInput, { target: { value: "15.00" } });
  fireEvent.change(deliveryDistanceInput, { target: { value: "6000" } });
  fireEvent.change(amountOfItems, { target: { value: "30" } });

  expect(cartValueInput).toHaveValue("15.00");
  expect(deliveryDistanceInput).toHaveValue("6000");
  expect(amountOfItems).toHaveValue("30");
  expect(screen.getByText(/Calculate Delivery Price/i)).not.toHaveAttribute(
    "disabled"
  );

  fireEvent.click(screen.getByText(/Calculate Delivery Price/i));

  const cartValueDetails = screen.getByTestId("cart-value-details");
  const distanceDetails = screen.getByTestId("distance-details");
  const itemDetails = screen.getByTestId("item-details");
  const deliveryFee = screen.getByTestId("delivery-fee");

  expect(cartValueDetails).toBeInTheDocument();
  expect(distanceDetails).toBeInTheDocument();
  expect(itemDetails).toBeInTheDocument();
  expect(deliveryFee).toBeInTheDocument();
  expect(cartValueDetails).toHaveTextContent("Cart value: 15.00€");
  expect(distanceDetails).toHaveTextContent("6000 meters");
  expect(itemDetails).toHaveTextContent("30 items");
  expect(deliveryFee).toHaveTextContent("15€");
});

test("Bulk items test", async () => {
  render(<App />);
  const cartValueInput = screen.getByPlaceholderText("cart value in euros");
  const deliveryDistanceInput =
    screen.getByPlaceholderText("distance in meters");
  const amountOfItems = screen.getByPlaceholderText("number of items");

  fireEvent.change(cartValueInput, { target: { value: "9.00" } });
  fireEvent.change(deliveryDistanceInput, { target: { value: "2000" } });
  fireEvent.change(amountOfItems, { target: { value: "13" } });

  expect(cartValueInput).toHaveValue("9.00");
  expect(deliveryDistanceInput).toHaveValue("2000");
  expect(amountOfItems).toHaveValue("13");
  expect(screen.getByText(/Calculate Delivery Price/i)).not.toHaveAttribute(
    "disabled"
  );

  fireEvent.click(screen.getByText(/Calculate Delivery Price/i));

  const cartValueDetails = screen.getByTestId("cart-value-details");
  const distanceDetails = screen.getByTestId("distance-details");
  const itemDetails = screen.getByTestId("item-details");
  const deliveryFee = screen.getByTestId("delivery-fee");

  expect(cartValueDetails).toBeInTheDocument();
  expect(distanceDetails).toBeInTheDocument();
  expect(itemDetails).toBeInTheDocument();
  expect(deliveryFee).toBeInTheDocument();
  expect(cartValueDetails).toHaveTextContent("Cart value: 9.00€");
  expect(distanceDetails).toHaveTextContent("2000 meters");
  expect(itemDetails).toHaveTextContent("13 items");
  expect(deliveryFee).toHaveTextContent("10.7€");
});
