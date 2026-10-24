import { registerHooks } from 'node:module';

registerHooks({
    resolve(specifier, context, nextResolve) {
        if (!specifier.startsWith('.') || /\.[^/]+$/.test(specifier)) {
            return nextResolve(specifier, context);
        }

        for (const candidate of [`${specifier}.js`, `${specifier}/index.js`]) {
            try {
                return nextResolve(candidate, context);
            } catch (error) {
                if (error.code !== 'ERR_MODULE_NOT_FOUND') {
                    throw error;
                }
            }
        }

        return nextResolve(specifier, context);
    },
});
