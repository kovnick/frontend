import * as m from "mithril";
import Page from "components/misc/Page";
import * as rip from "./rip.jpg";

export default {
    view({ attrs, children }) {
        return m(Page, [
            m(Page.Head, { image: rip, position: "50% 40%" }, [m(".container", [m("h1.header", attrs.title)])]),
            m(Page.Content, [m(".container", children)]),
        ]);
    },
};
