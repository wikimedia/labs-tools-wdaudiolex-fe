/* eslint-env jest */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CategorySelector from "../CategorySelector";

const getCategories = jest.fn();

jest.mock( "../../../services/api", () => ( {
	getLanguages: jest.fn()
} ) );

describe( "CategorySelector", () => {
	const onCategorySelect = jest.fn();

	beforeEach( () => {
		// Reset mocks before each test
		jest.clearAllMocks();

		// Mock API response with test data
		getCategories.mockResolvedValue( {
			data: [
				{ id: "test_category_1", name: "Test Category 1", count: 100 },
				{ id: "test_category_2", name: "Test Category 2", count: 200 }
			]
		} );
	} );

	test( "renders with loading state initially", () => {
		render( <CategorySelector onCategorySelect={onCategorySelect} /> );

		// Should show loading indicator initially
		expect( screen.getByRole( "progressbar" ) ).toBeInTheDocument();
	} );

	test( "displays categories after loading", async () => {
		render( <CategorySelector onCategorySelect={onCategorySelect} /> );

		// Wait for loading to complete
		await waitFor( () => {
			expect( screen.queryByRole( "progressbar" ) ).not.toBeInTheDocument();
		} );

		// Open the dropdown
		fireEvent.mouseDown( screen.getByRole( "combobox" ) );

		// Check that categories appear in the dropdown
		await waitFor( () => {
			expect( screen.getByText( "Test Category 1" ) ).toBeInTheDocument();
			expect( screen.getByText( "Test Category 2" ) ).toBeInTheDocument();
		} );
	} );

	test( "calls onCategorySelect when a category is selected", async () => {
		render( <CategorySelector onCategorySelect={onCategorySelect} /> );

		// Wait for loading to complete
		await waitFor( () => {
			expect( screen.queryByRole( "progressbar" ) ).not.toBeInTheDocument();
		} );

		// Open the dropdown
		fireEvent.mouseDown( screen.getByRole( "combobox" ) );

		// Select an option
		fireEvent.click( screen.getByText( "Test Category 1" ) );

		// Check the callback was called with the correct ID
		expect( onCategorySelect ).toHaveBeenCalledWith( "test_category_1" );
	} );

	test( "handles search query changes", async () => {
		render( <CategorySelector onCategorySelect={onCategorySelect} /> );

		// Wait for initial loading to complete
		await waitFor( () => {
			expect( screen.queryByRole( "progressbar" ) ).not.toBeInTheDocument();
		} );

		// Reset mock to set up for search query test
		getCategories.mockReset();
		getCategories.mockResolvedValue( {
			data: [
				{ id: "filtered_category", name: "Filtered Category", count: 50 }
			]
		} );

		// Type in search field
		fireEvent.change( screen.getByLabelText( "Search categories" ), {
			target: { value: "filter" }
		} );

		// Check that the API was called with the search query
		expect( getCategories ).toHaveBeenCalledWith( "filter" );
	} );
} );
