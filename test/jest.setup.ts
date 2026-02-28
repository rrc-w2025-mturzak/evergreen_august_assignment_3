// Always mock firebase in every test
jest.mock("src/api/v1/config/firebaseConfig", () => ({
    db: {
        collection: jest.fn(),
        doc: jest.fn(),
    },
}));

// Reset all mocks after each test
afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.resetModules();
});