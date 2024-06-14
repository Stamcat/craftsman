import { css } from "styled-components";
import { color } from "../../utilities/colors";
import { gutter } from "../../utilities/layout";
/* #__PURE__ */
export const select = css`
    select {
        // browser overrides
        background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02LjAwMTcyIDcuMzM1NjFDNS44OTA0MyA3LjMzNTYxIDUuNzc3NjUgNy4zMTQyMyA1LjY2MzM1IDcuMjcxNDdDNS41NDkwNCA3LjIyODY4IDUuNDQwNzYgNy4xNTQ0MiA1LjMzODUxIDcuMDQ4NjdMMC4xODM5MDMgMS43MTc3QzAuMDU5MDkyMSAxLjU4ODYyIC0wLjAwMjE4ODY0IDEuNDQ2NyA1Ljk2NzY1ZS0wNSAxLjI5MTk0QzAuMDAyMzA3OTkgMS4xMzcxOCAwLjA2NTg0NzQgMC45OTUyNDggMC4xOTA2NzggMC44NjYxNDdDMC4zMTU1MDggMC43MzcwNjYgMC40NTM4NjcgMC42NzI1MjUgMC42MDU3NTYgMC42NzI1MjVDMC43NTc2NDQgMC42NzI1MjUgMC44OTYwMDQgMC43MzcwNjYgMS4wMjA4MyAwLjg2NjE0N0w2LjAwMTcyIDYuMDE3NDRMMTAuOTg5NCAwLjg1OTE3MkMxMS4xMTQyIDAuNzMwMDcgMTEuMjUxNCAwLjY2NjY4MiAxMS40MDEgMC42NjkwMDdDMTEuNTUwNyAwLjY3MTM1MiAxMS42ODc5IDAuNzM3MDY2IDExLjgxMjggMC44NjYxNDdDMTEuOTM3NiAwLjk5NTI0OCAxMiAxLjEzODM0IDEyIDEuMjk1NDNDMTIgMS40NTI1MyAxMS45Mzc2IDEuNTk1NjMgMTEuODEyOCAxLjcyNDcxTDYuNjY0OTIgNy4wNDg2N0M2LjU2MjY3IDcuMTU0NDIgNi40NTgxNSA3LjIyODY4IDYuMzUxMzcgNy4yNzE0N0M2LjI0NDYgNy4zMTQyMyA2LjEyODA1IDcuMzM1NjEgNi4wMDE3MiA3LjMzNTYxWiIgZmlsbD0iIzc0NzM2RSIvPgo8L3N2Zz4K)
            no-repeat 95% 50%;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        // design system styles
        color: ${color("almostBlack")};
        border-radius: 3px;
        border: 1px solid ${color("gray4")};
        padding: ${gutter(0.5)};
        &:disabled {
            border-color: ${color("gray2")};
            background-color: ${color("gray1")};
        }
    }
`;
