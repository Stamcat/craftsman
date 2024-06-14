import React from "react";
import styled, { css } from "styled-components";
import { RuleSet } from "styled-components/dist/types";
import { color } from "../utilities/colors";

export type CheckboxTheme = "Distributor" | "Customer";

export interface CheckboxProps extends React.ComponentProps<"input"> {
    /** Checkbox checked status */
    $checked: boolean;
    /** Checkbox onCheck event */
    $onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /** Checkbox label */
    $label: string;
    /** Pass in any custom styles here, you can also nest styles inside this object */
    $styles?: RuleSet<object>;
    /** Checkbox disabled status */
    $disabled?: boolean;
    /** Checkbox theme */
    $theme?: CheckboxTheme;
}

const wellessStyles = () => css`
    width: 14px;
    height: 14px;
    margin-right: 8px;
`;

const h1Styles = () => css`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;

const Container = styled.div<CheckboxProps>`
    display: flex;
    align-items: center;
    justify-items: center;
    ${(props) => props.$styles}
`;

const StyledCheckbox = styled.input.attrs<CheckboxProps>({ type: "checkbox" })`
    color: ${color("garden")};
    &:checked {
        color: ${color("garden")};
        background-color: ${color("garden")};
        border-color: ${color("garden")};
    }
    &:disabled {
        background-color: ${color("gray4")};
        border-color: ${color("gray4")};
    }
    ${(props) => checkboxStyles(props)}
`;

const checkboxStyles = (props: CheckboxProps) => {
    const theme = props.$theme || ("Distributor" as CheckboxTheme);
    const themes = {
        Distributor: wellessStyles,
        Customer: h1Styles,
    } as Record<CheckboxTheme, () => RuleSet<object>>;
    return themes[theme];
};

const Label = styled.span<CheckboxProps>`
    font-size: ${(props) => (props.$theme === "Distributor" ? `14px` : `24px`)};
    line-height: 20px;
    color: ${(props) => (!props.$disabled ? color("garden") : color("gray4"))};
`;

/**
 * This component renders a custom-styled checkbox input.
 * @param props
 * @returns
 * #__PURE__
 */
export const Checkbox: React.FC<CheckboxProps> = (props) => {
    return (
        <Container {...props}>
            <StyledCheckbox checked={props.$checked} onChange={props.$onChange} disabled={props.$disabled} {...props} />
            <Label {...props}>{props.$label}</Label>
        </Container>
    );
};
