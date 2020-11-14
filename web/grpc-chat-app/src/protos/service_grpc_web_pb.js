/**
 * @fileoverview gRPC-Web generated client stub for grpc.chat
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.grpc = {};
proto.grpc.chat = require('./service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.grpc.chat.GrpcChatClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.grpc.chat.GrpcChatPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpc.chat.Connect,
 *   !proto.grpc.chat.Message>}
 */
const methodDescriptor_GrpcChat_CreateStream = new grpc.web.MethodDescriptor(
  '/grpc.chat.GrpcChat/CreateStream',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.grpc.chat.Connect,
  proto.grpc.chat.Message,
  /**
   * @param {!proto.grpc.chat.Connect} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpc.chat.Message.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.grpc.chat.Connect,
 *   !proto.grpc.chat.Message>}
 */
const methodInfo_GrpcChat_CreateStream = new grpc.web.AbstractClientBase.MethodInfo(
  proto.grpc.chat.Message,
  /**
   * @param {!proto.grpc.chat.Connect} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpc.chat.Message.deserializeBinary
);


/**
 * @param {!proto.grpc.chat.Connect} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.grpc.chat.Message>}
 *     The XHR Node Readable Stream
 */
proto.grpc.chat.GrpcChatClient.prototype.createStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/grpc.chat.GrpcChat/CreateStream',
      request,
      metadata || {},
      methodDescriptor_GrpcChat_CreateStream);
};


/**
 * @param {!proto.grpc.chat.Connect} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.grpc.chat.Message>}
 *     The XHR Node Readable Stream
 */
proto.grpc.chat.GrpcChatPromiseClient.prototype.createStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/grpc.chat.GrpcChat/CreateStream',
      request,
      metadata || {},
      methodDescriptor_GrpcChat_CreateStream);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpc.chat.Message,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_GrpcChat_BroadcastMessage = new grpc.web.MethodDescriptor(
  '/grpc.chat.GrpcChat/BroadcastMessage',
  grpc.web.MethodType.UNARY,
  proto.grpc.chat.Message,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.grpc.chat.Message} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.grpc.chat.Message,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_GrpcChat_BroadcastMessage = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.grpc.chat.Message} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.grpc.chat.Message} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpc.chat.GrpcChatClient.prototype.broadcastMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpc.chat.GrpcChat/BroadcastMessage',
      request,
      metadata || {},
      methodDescriptor_GrpcChat_BroadcastMessage,
      callback);
};


/**
 * @param {!proto.grpc.chat.Message} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.grpc.chat.GrpcChatPromiseClient.prototype.broadcastMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpc.chat.GrpcChat/BroadcastMessage',
      request,
      metadata || {},
      methodDescriptor_GrpcChat_BroadcastMessage);
};


module.exports = proto.grpc.chat;

