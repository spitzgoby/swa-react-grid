const validateWidths = (widths) => {
    if (widths.length !== 4) {
        throw new Error();
    }

    widths.forEach((width, index) => {
        const parsedWidth = parseFloat(width);

        if (
            isNaN(parsedWidth) ||
            (index > 0 && parsedWidth <= parseFloat(widths[index - 1]))
        ) {
            throw new Error();
        }
    });
};
export const sizes = ["xs", "sm", "md", "lg", "xl"];
export const createBreakpoints = (widths) =>
    sizes.map((size, index) => {
        validateWidths(widths);
        let newBreakpoint = { size };

        if (index > 0) {
            newBreakpoint.minWidth = parseFloat(widths[index - 1]) + "px";
        }

        if (index < widths.length) {
            newBreakpoint.maxWidth = parseFloat(widths[index]) - 1 + "px";
        }

        return newBreakpoint;
    });

export const defaultBreakpoints = [
    {
        size: "xs",
        maxWidth: "599px",
    },
    {
        size: "sm",
        maxWidth: "899px",
        minWidth: "600px",
    },
    {
        size: "md",
        maxWidth: "1199px",
        minWidth: "900px",
    },
    {
        size: "lg",
        maxWidth: "1535px",
        minWidth: "1200px",
    },
    {
        size: "xl",
        minWidth: "1536px",
    },
];

export const addMissingSizes = (propName, prop = {}, defaultValue, shorthand) =>
    sizes.reduce((acc, size, index) => {
        if (!Object.prototype.hasOwnProperty.call(prop, size)) {
            if (index > 0) {
                acc[size] = acc[sizes[index - 1]];
            } else if (shorthand(propName, prop)) {
                acc[size] = prop;
            } else {
                acc[size] = defaultValue;
            }
        } else {
            acc[size] = prop[size];
        }

        return acc;
    }, {});

export const createScreenMediaQuery = (breakpoint) =>
    "@media screen" +
    `${breakpoint.minWidth ? ` and (min-width: ${breakpoint.minWidth})` : ""}` +
    `${breakpoint.maxWidth ? ` and (max-width: ${breakpoint.maxWidth})` : ""}`;
