/*global Ultraviolet*/
self.__uv$config = {
    prefix: '/uv/service/',
    bare: '/api/bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/common/uv.handler.js',
    client: '/uv/common/uv.client.js',
    bundle: '/uv/common/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/common/uv.sw.js',
};
