import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  createGenerateClassName,
} from "@mui/styles";

type RTLProps = {
  children: React.ReactNode;
};

const generateClassName = createGenerateClassName();

function RTL(props: RTLProps) {
  const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
  });

  //TODO ...
  const isRtl = true;

  const cacheRtl = createCache({
    key: isRtl ? "muirtl" : "muiltr",
    prepend: true,
    stylisPlugins: isRtl ? [prefixer, rtlPlugin] : undefined,
  });

  return (
    <CacheProvider value={cacheRtl}>
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        {props.children}
      </StylesProvider>
    </CacheProvider>
  );
}

export default RTL;
