import './lit-element-336867a2.js';

function litStyle(myStyles) {

    return superclass => class extends superclass {

        static getStyles() {

            const styles = super.getStyles();

            if (!styles) {
                return myStyles;
            } else if (Array.isArray(styles)) {
                return [myStyles, ...styles];
            } else {
                return [myStyles, styles];
            }

        }

    }

}

export { litStyle as l };
