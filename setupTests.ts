import Enzyme from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";

Enzyme.configure({ adapter: new Adapter() });
/**
 * Jest sometimes throws false positives. We need to suppress those.
 * solution taken from here https://medium.com/@jofarnold/testing-lifecycle-methods-with-react-native-enzymes-mount-and-jsdom-dacae7ee7b51
 * and here https://stackoverflow.com/questions/44467657/jest-better-way-to-disable-console-inside-unit-tests
 */
function suppressDomErrors() {
    const suppressedErrors =
        /(React does not recognize the.*prop on a DOM element|Unknown event handler property|is using uppercase HTML|Received `true` for a non-boolean attribute `accessible`|The tag.*is is using incorrect casing|The tag.*is unrecognized in this browser|PascalCase)/;
    global.console.error = (message: string) => {
        const realError = global.console.error;
        if (message.toString().match(suppressedErrors)) {
            return null;
        } else {
            return realError;
        }
    };
}
suppressDomErrors();

jest.mock("flat", () => {
    return {
        flatten: () => jest.fn(),
        unflatten: () => jest.fn(),
    };
});

jest.mock("react", () => {
    const actual = jest.requireActual("react");
    return {
        ...actual,
        Suspense: jest.fn(),
        lazy: jest.fn(),
    };
});

jest.mock("react-redux", () => {
    return {
        connect: (mapStateToProps: any, mapDispatchToProps: any) => (ReactComponent: any) => ({
            mapStateToProps,
            mapDispatchToProps,
            ReactComponent,
        }),
        Provider: jest.fn(),
    };
});
