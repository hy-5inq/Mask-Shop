/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "5e4efb656f8426366fcb";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "i18n-contents";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./Components/lib/i18n-contents.js")(__webpack_require__.s = "./Components/lib/i18n-contents.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Components/_locales/ko.js":
/*!***********************************!*\
  !*** ./Components/_locales/ko.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.default = {\n\tAPP_NAME: \"\\uB9C8\\uC2A4\\uD06C\\uC0F5\",\n\tMENU_TITLE: \"<strong>MASK</strong> SHOP\",\n\n\tLOGIN: \"\\uB85C\\uADF8\\uC778\",\n\tORDER_LIST: \"\\uC8FC\\uBB38\\uBAA9\\uB85D\",\n\tSHOP_BASKET: \"\\uC7A5\\uBC14\\uAD6C\\uB2C8\",\n\tMY_PAGE: \"\\uB9C8\\uC774\\uD398\\uC774\\uC9C0\",\n\tTRACK_DELIVERY: \"\\uBC30\\uC1A1\\uC870\\uD68C\",\n\tJOIN: \"\\uD68C\\uC6D0\\uAC00\\uC785\",\n\n\tMENU_BY_DUST: \"\\uBBF8\\uC138\\uBA3C\\uC9C0 \\uB18D\\uB3C4\\uBCC4\",\n\tMENU_BY_SIZE: \"\\uD06C\\uAE30\\uBCC4\",\n\tMENU_BY_USAGE: \"\\uC0AC\\uC6A9\\uBCC4\",\n\tMENU_BY_COMPANY: \"\\uD68C\\uC0AC\\uBCC4\",\n\n\tTOTAL_NUMBER_ITEM: \"Total <strong>0</strong> items\",\n\tSORT_POPULARITY: \"\\uC778\\uAE30\\uC21C\",\n\tSORT_NAME: \"\\uC774\\uB984\\uC21C\",\n\tSORT_LOW_RPICE: \"\\uB0AE\\uC740\\uAC00\\uACA9\\uC21C\",\n\tSORT_HIGH_PRICE: \"\\uB192\\uC740\\uAC00\\uACA9\\uC21C\",\n\tSORT_DATE: \"\\uC2E0\\uC0C1\\uD488\",\n\n\tLOGIN_TITLE: \"LOGIN\",\n\tLOGIN_ID: \"ID\",\n\tLOGIN_PASSWORD: \"PASSWORD\",\n\tLOGIN_SAVE_ID: \"\\uC544\\uC774\\uB514 \\uC800\\uC7A5\",\n\tLOGIN_BTN_KAKAO: \"\\uCE74\\uCE74\\uC624 \\uB85C\\uADF8\\uC778\",\n\tLOGIN_BTN_DEFAULT: \"\\uB9C8\\uC2A4\\uD06C\\uC0F5 \\uB85C\\uADF8\\uC778\",\n\tLOGIN_ID_SEARCH: \"\\uC544\\uC774\\uB514 \\uCC3E\\uAE30\",\n\tLOGIN_PWD_SEARCH: \"\\uBE44\\uBC00\\uBC88\\uD638 \\uCC3E\\uAE30\",\n\n\tAIR_MAP_TEXT: \"\\uD604\\uC7AC\\uC9C0\\uC5ED \\uBBF8\\uC138\\uBA3C\\uC9C0 \\uC218\\uCE58 <br/> <span class='current-air'>Loading...</span>\",\n\n\tREGULAR_SERVICE_TITLE: \"<strong>\\uC815\\uAE30\\uBC30\\uC1A1</strong> \\uC11C\\uBE44\\uC2A4\",\n\tREGULAR_SERVICE_DES: \"<strong style='color:#F47751;'>\\uC6D0\\uD558\\uB294 \\uB0A0\\uC9DC</strong>\\uC5D0 \\uC790\\uB3D9\\uC73C\\uB85C \\uBC30\\uC1A1!\",\n\tREGULAR_SERVICE_BTN: \"\\uC774\\uC6A9\\uD558\\uAE30\",\n\n\tMENU_BY_DUST_1: \"50 - 80\\u338D/m\\xB3\",\n\tMENU_BY_DUST_2: \"80 - 100\\u338D/m\\xB3\",\n\tMENU_BY_DUST_3: \"100 - 150\\u338D/m\\xB3\",\n\tMENU_BY_DUST_4: \"150\\u338D/m\\xB3 \\uC774\\uC0C1\",\n\n\tMENU_BY_SIZE_SMALL: \"\\uC18C\\uD615\",\n\tMENU_BY_SIZE_MIDDLE: \"\\uC911\\uD615\",\n\tMENU_BY_SIZE_BIG: \"\\uB300\\uD615\",\n\n\tMENU_BY_USAGE_1: \"\\uBC29\\uD55C\\uC6A9\",\n\tMENU_BY_USAGE_2: \"\\uD669\\uC0AC\\uC6A9\",\n\tMENU_BY_USAGE_3: \"\\uBCF4\\uAC74\\uC6A9\",\n\tMENU_BY_USAGE_4: \"\\uBC29\\uC5ED\\uC6A9\",\n\tMENU_BY_USAGE_5: \"\\uC218\\uC220\\uC6A9\",\n\tMENU_BY_USAGE_6: \"\\uC0B0\\uC5C5\\uC6A9\",\n\n\tMENU_BY_COMPANY_1: \"3M\",\n\tMENU_BY_COMPANY_2: \"\\uD06C\\uB9B0\\uD0D1\",\n\tMENU_BY_COMPANY_3: \"\\uC7A5\\uC815\\uC0B0\\uC5C5\",\n\tMENU_BY_COMPANY_4: \"DOBU\",\n\tMENU_BY_COMPANY_5: \"\\uB9C8\\uC2A4\\uD06C\\uC0C1\\uC0AC\",\n\tMENU_BY_COMPANY_6: \"\\uC0C1\\uACF5\\uC591\\uD589\",\n\tMENU_BY_COMPANY_7: \"\\uB9BC\\uD53C\\uC5B4\",\n\tMENU_BY_COMPANY_8: \"\\uC138\\uCC3D\\uC5D0\\uC2A4\\uC5E0\",\n\tMENU_BY_COMPANY_9: \"\\u321CHD\\uBA54\\uB514\\uC2A4\"\n};\n\n//# sourceURL=webpack:///./Components/_locales/ko.js?");

/***/ }),

/***/ "./Components/lib/i18n-contents.js":
/*!*****************************************!*\
  !*** ./Components/lib/i18n-contents.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _ko = __webpack_require__(/*! ../_locales/ko.js */ \"./Components/_locales/ko.js\");\n\nvar _ko2 = _interopRequireDefault(_ko);\n\nvar _i18next = __webpack_require__(/*! i18next */ \"./node_modules/i18next/dist/es/index.js\");\n\nvar _i18next2 = _interopRequireDefault(_i18next);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n_i18next2.default.init({\n\tlng: 'ko',\n\tdebug: true,\n\tresources: {\n\t\tko: {\n\t\t\ttranslation: _ko2.default\n\t\t}\n\t}\n}).then(function () {\n\tvar content = document.querySelectorAll('[i18n-content]');\n\tif (content) {\n\t\tcontent.forEach(function (node) {\n\t\t\tvar key = node.getAttribute('i18n-content');\n\t\t\tnode.innerHTML = _i18next2.default.t(key);\n\t\t});\n\t}\n});\n\n//# sourceURL=webpack:///./Components/lib/i18n-contents.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _arrayWithHoles(arr) {\n  if (Array.isArray(arr)) return arr;\n}\n\nmodule.exports = _arrayWithHoles;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/arrayWithHoles.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _arrayWithoutHoles(arr) {\n  if (Array.isArray(arr)) {\n    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {\n      arr2[i] = arr[i];\n    }\n\n    return arr2;\n  }\n}\n\nmodule.exports = _arrayWithoutHoles;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nmodule.exports = _assertThisInitialized;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nmodule.exports = _defineProperty;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/defineProperty.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _getPrototypeOf(o) {\n  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\nmodule.exports = _getPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}\n\nmodule.exports = _inherits;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _iterableToArray(iter) {\n  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter);\n}\n\nmodule.exports = _iterableToArray;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/iterableToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _iterableToArrayLimit(arr, i) {\n  var _arr = [];\n  var _n = true;\n  var _d = false;\n  var _e = undefined;\n\n  try {\n    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {\n      _arr.push(_s.value);\n\n      if (i && _arr.length === i) break;\n    }\n  } catch (err) {\n    _d = true;\n    _e = err;\n  } finally {\n    try {\n      if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n    } finally {\n      if (_d) throw _e;\n    }\n  }\n\n  return _arr;\n}\n\nmodule.exports = _iterableToArrayLimit;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");\n}\n\nmodule.exports = _nonIterableRest;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/nonIterableRest.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _nonIterableSpread() {\n  throw new TypeError(\"Invalid attempt to spread non-iterable instance\");\n}\n\nmodule.exports = _nonIterableSpread;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/nonIterableSpread.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectSpread.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectSpread.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var defineProperty = __webpack_require__(/*! ./defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n\nfunction _objectSpread(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i] != null ? arguments[i] : {};\n    var ownKeys = Object.keys(source);\n\n    if (typeof Object.getOwnPropertySymbols === 'function') {\n      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {\n        return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n      }));\n    }\n\n    ownKeys.forEach(function (key) {\n      defineProperty(target, key, source[key]);\n    });\n  }\n\n  return target;\n}\n\nmodule.exports = _objectSpread;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/objectSpread.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _typeof = __webpack_require__(/*! ../helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return assertThisInitialized(self);\n}\n\nmodule.exports = _possibleConstructorReturn;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _setPrototypeOf(o, p) {\n  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nmodule.exports = _setPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ \"./node_modules/@babel/runtime/helpers/arrayWithHoles.js\");\n\nvar iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ \"./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js\");\n\nvar nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ \"./node_modules/@babel/runtime/helpers/nonIterableRest.js\");\n\nfunction _slicedToArray(arr, i) {\n  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();\n}\n\nmodule.exports = _slicedToArray;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/slicedToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ \"./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js\");\n\nvar iterableToArray = __webpack_require__(/*! ./iterableToArray */ \"./node_modules/@babel/runtime/helpers/iterableToArray.js\");\n\nvar nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ \"./node_modules/@babel/runtime/helpers/nonIterableSpread.js\");\n\nfunction _toConsumableArray(arr) {\n  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();\n}\n\nmodule.exports = _toConsumableArray;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/toConsumableArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof2(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof2(obj); }\n\nfunction _typeof(obj) {\n  if (typeof Symbol === \"function\" && _typeof2(Symbol.iterator) === \"symbol\") {\n    module.exports = _typeof = function _typeof(obj) {\n      return _typeof2(obj);\n    };\n  } else {\n    module.exports = _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : _typeof2(obj);\n    };\n  }\n\n  return _typeof(obj);\n}\n\nmodule.exports = _typeof;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/typeof.js?");

/***/ }),

/***/ "./node_modules/i18next/dist/es/BackendConnector.js":
/*!**********************************************************!*\
  !*** ./node_modules/i18next/dist/es/BackendConnector.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"./node_modules/@babel/runtime/helpers/objectSpread.js\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils.js */ \"./node_modules/i18next/dist/es/utils.js\");\n/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./logger.js */ \"./node_modules/i18next/dist/es/logger.js\");\n/* harmony import */ var _EventEmitter_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./EventEmitter.js */ \"./node_modules/i18next/dist/es/EventEmitter.js\");\n\n\n\n\n\n\n\n\n\n\n\n\nfunction remove(arr, what) {\n  var found = arr.indexOf(what);\n\n  while (found !== -1) {\n    arr.splice(found, 1);\n    found = arr.indexOf(what);\n  }\n}\n\nvar Connector =\n/*#__PURE__*/\nfunction (_EventEmitter) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(Connector, _EventEmitter);\n\n  function Connector(backend, store, services) {\n    var _this;\n\n    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Connector);\n\n    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Connector).call(this));\n    _EventEmitter_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"].call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this))); // <=IE10 fix (unable to call parent constructor)\n\n    _this.backend = backend;\n    _this.store = store;\n    _this.languageUtils = services.languageUtils;\n    _this.options = options;\n    _this.logger = _logger_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"].create('backendConnector');\n    _this.state = {};\n    _this.queue = [];\n\n    if (_this.backend && _this.backend.init) {\n      _this.backend.init(services, options.backend, options);\n    }\n\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Connector, [{\n    key: \"queueLoad\",\n    value: function queueLoad(languages, namespaces, options, callback) {\n      var _this2 = this;\n\n      // find what needs to be loaded\n      var toLoad = [];\n      var pending = [];\n      var toLoadLanguages = [];\n      var toLoadNamespaces = [];\n      languages.forEach(function (lng) {\n        var hasAllNamespaces = true;\n        namespaces.forEach(function (ns) {\n          var name = \"\".concat(lng, \"|\").concat(ns);\n\n          if (!options.reload && _this2.store.hasResourceBundle(lng, ns)) {\n            _this2.state[name] = 2; // loaded\n          } else if (_this2.state[name] < 0) {// nothing to do for err\n          } else if (_this2.state[name] === 1) {\n            if (pending.indexOf(name) < 0) pending.push(name);\n          } else {\n            _this2.state[name] = 1; // pending\n\n            hasAllNamespaces = false;\n            if (pending.indexOf(name) < 0) pending.push(name);\n            if (toLoad.indexOf(name) < 0) toLoad.push(name);\n            if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);\n          }\n        });\n        if (!hasAllNamespaces) toLoadLanguages.push(lng);\n      });\n\n      if (toLoad.length || pending.length) {\n        this.queue.push({\n          pending: pending,\n          loaded: {},\n          errors: [],\n          callback: callback\n        });\n      }\n\n      return {\n        toLoad: toLoad,\n        pending: pending,\n        toLoadLanguages: toLoadLanguages,\n        toLoadNamespaces: toLoadNamespaces\n      };\n    }\n  }, {\n    key: \"loaded\",\n    value: function loaded(name, err, data) {\n      var _name$split = name.split('|'),\n          _name$split2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_name$split, 2),\n          lng = _name$split2[0],\n          ns = _name$split2[1];\n\n      if (err) this.emit('failedLoading', lng, ns, err);\n\n      if (data) {\n        this.store.addResourceBundle(lng, ns, data);\n      } // set loaded\n\n\n      this.state[name] = err ? -1 : 2; // consolidated loading done in this run - only emit once for a loaded namespace\n\n      var loaded = {}; // callback if ready\n\n      this.queue.forEach(function (q) {\n        _utils_js__WEBPACK_IMPORTED_MODULE_8__[\"pushPath\"](q.loaded, [lng], ns);\n        remove(q.pending, name);\n        if (err) q.errors.push(err);\n\n        if (q.pending.length === 0 && !q.done) {\n          // only do once per loaded -> this.emit('loaded', q.loaded);\n          Object.keys(q.loaded).forEach(function (l) {\n            if (!loaded[l]) loaded[l] = [];\n\n            if (q.loaded[l].length) {\n              q.loaded[l].forEach(function (ns) {\n                if (loaded[l].indexOf(ns) < 0) loaded[l].push(ns);\n              });\n            }\n          });\n          /* eslint no-param-reassign: 0 */\n\n          q.done = true;\n\n          if (q.errors.length) {\n            q.callback(q.errors);\n          } else {\n            q.callback();\n          }\n        }\n      }); // emit consolidated loaded event\n\n      this.emit('loaded', loaded); // remove done load requests\n\n      this.queue = this.queue.filter(function (q) {\n        return !q.done;\n      });\n    }\n  }, {\n    key: \"read\",\n    value: function read(lng, ns, fcName) {\n      var _this3 = this;\n\n      var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;\n      var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 250;\n      var callback = arguments.length > 5 ? arguments[5] : undefined;\n      if (!lng.length) return callback(null, {}); // noting to load\n\n      return this.backend[fcName](lng, ns, function (err, data) {\n        if (err && data\n        /* = retryFlag */\n        && tried < 5) {\n          setTimeout(function () {\n            _this3.read.call(_this3, lng, ns, fcName, tried + 1, wait * 2, callback);\n          }, wait);\n          return;\n        }\n\n        callback(err, data);\n      });\n    }\n    /* eslint consistent-return: 0 */\n\n  }, {\n    key: \"prepareLoading\",\n    value: function prepareLoading(languages, namespaces) {\n      var _this4 = this;\n\n      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n      var callback = arguments.length > 3 ? arguments[3] : undefined;\n\n      if (!this.backend) {\n        this.logger.warn('No backend was added via i18next.use. Will not load resources.');\n        return callback && callback();\n      }\n\n      if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);\n      if (typeof namespaces === 'string') namespaces = [namespaces];\n      var toLoad = this.queueLoad(languages, namespaces, options, callback);\n\n      if (!toLoad.toLoad.length) {\n        if (!toLoad.pending.length) callback(); // nothing to load and no pendings...callback now\n\n        return null; // pendings will trigger callback\n      }\n\n      toLoad.toLoad.forEach(function (name) {\n        _this4.loadOne(name);\n      });\n    }\n  }, {\n    key: \"load\",\n    value: function load(languages, namespaces, callback) {\n      this.prepareLoading(languages, namespaces, {}, callback);\n    }\n  }, {\n    key: \"reload\",\n    value: function reload(languages, namespaces, callback) {\n      this.prepareLoading(languages, namespaces, {\n        reload: true\n      }, callback);\n    }\n  }, {\n    key: \"loadOne\",\n    value: function loadOne(name) {\n      var _this5 = this;\n\n      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n\n      var _name$split3 = name.split('|'),\n          _name$split4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_name$split3, 2),\n          lng = _name$split4[0],\n          ns = _name$split4[1];\n\n      this.read(lng, ns, 'read', null, null, function (err, data) {\n        if (err) _this5.logger.warn(\"\".concat(prefix, \"loading namespace \").concat(ns, \" for language \").concat(lng, \" failed\"), err);\n        if (!err && data) _this5.logger.log(\"\".concat(prefix, \"loaded namespace \").concat(ns, \" for language \").concat(lng), data);\n\n        _this5.loaded(name, err, data);\n      });\n    }\n  }, {\n    key: \"saveMissing\",\n    value: function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {\n      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};\n\n      if (this.backend && this.backend.create) {\n        this.backend.create(languages, namespace, key, fallbackValue, null\n        /* unused callback */\n        , _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, options, {\n          isUpdate: isUpdate\n        }));\n      } // write to store to avoid resending\n\n\n      if (!languages || !languages[0]) return;\n      this.store.addResource(languages[0], namespace, key, fallbackValue);\n    }\n  }]);\n\n  return Connector;\n}(_EventEmitter_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Connector);\n\n//# sourceURL=webpack:///./node_modules/i18next/dist/es/BackendConnector.js?");

/***/ }),

/***/ "./node_modules/i18next/dist/es/EventEmitter.js":
/*!******************************************************!*\
  !*** ./node_modules/i18next/dist/es/EventEmitter.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar EventEmitter =\n/*#__PURE__*/\nfunction () {\n  function EventEmitter() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, EventEmitter);\n\n    this.observers = {};\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(EventEmitter, [{\n    key: \"on\",\n    value: function on(events, listener) {\n      var _this = this;\n\n      events.split(' ').forEach(function (event) {\n        _this.observers[event] = _this.observers[event] || [];\n\n        _this.observers[event].push(listener);\n      });\n      return this;\n    }\n  }, {\n    key: \"off\",\n    value: function off(event, listener) {\n      var _this2 = this;\n\n      if (!this.observers[event]) {\n        return;\n      }\n\n      this.observers[event].forEach(function () {\n        if (!listener) {\n          delete _this2.observers[event];\n        } else {\n          var index = _this2.observers[event].indexOf(listener);\n\n          if (index > -1) {\n            _this2.observers[event].splice(index, 1);\n          }\n        }\n      });\n    }\n  }, {\n    key: \"emit\",\n    value: function emit(event) {\n      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n        args[_key - 1] = arguments[_key];\n      }\n\n      if (this.observers[event]) {\n        var cloned = [].concat(this.observers[event]);\n        cloned.forEach(function (observer) {\n          observer.apply(void 0, args);\n        });\n      }\n\n      if (this.observers['*']) {\n        var _cloned = [].concat(this.observers['*']);\n\n        _cloned.forEach(function (observer) {\n          observer.apply(observer, [event].concat(args));\n        });\n      }\n    }\n  }]);\n\n  return EventEmitter;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (EventEmitter);\n\n//# sourceURL=webpack:///./node_modules/i18next/dist/es/EventEmitter.js?");

/***/ }),

/***/ "./node_modules/i18next/dist/es/Interpolator.js":
/*!******************************************************!*\
  !*** ./node_modules/i18next/dist/es/Interpolator.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"./node_modules/@babel/runtime/helpers/objectSpread.js\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ \"./node_modules/i18next/dist/es/utils.js\");\n/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./logger.js */ \"./node_modules/i18next/dist/es/logger.js\");\n\n\n\n\n\n\nvar Interpolator =\n/*#__PURE__*/\nfunction () {\n  function Interpolator() {\n    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Interpolator);\n\n    this.logger = _logger_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].create('interpolator');\n    this.init(options, true);\n  }\n  /* eslint no-param-reassign: 0 */\n\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Interpolator, [{\n    key: \"init\",\n    value: function init() {\n      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n      var reset = arguments.length > 1 ? arguments[1] : undefined;\n\n      if (reset) {\n        this.options = options;\n\n        this.format = options.interpolation && options.interpolation.format || function (value) {\n          return value;\n        };\n      }\n\n      if (!options.interpolation) options.interpolation = {\n        escapeValue: true\n      };\n      var iOpts = options.interpolation;\n      this.escape = iOpts.escape !== undefined ? iOpts.escape : _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"escape\"];\n      this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;\n      this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;\n      this.prefix = iOpts.prefix ? _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"regexEscape\"](iOpts.prefix) : iOpts.prefixEscaped || '{{';\n      this.suffix = iOpts.suffix ? _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"regexEscape\"](iOpts.suffix) : iOpts.suffixEscaped || '}}';\n      this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';\n      this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';\n      this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';\n      this.nestingPrefix = iOpts.nestingPrefix ? _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"regexEscape\"](iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"regexEscape\"]('$t(');\n      this.nestingSuffix = iOpts.nestingSuffix ? _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"regexEscape\"](iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"regexEscape\"](')');\n      this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000; // the regexp\n\n      this.resetRegExp();\n    }\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      if (this.options) this.init(this.options);\n    }\n  }, {\n    key: \"resetRegExp\",\n    value: function resetRegExp() {\n      // the regexp\n      var regexpStr = \"\".concat(this.prefix, \"(.+?)\").concat(this.suffix);\n      this.regexp = new RegExp(regexpStr, 'g');\n      var regexpUnescapeStr = \"\".concat(this.prefix).concat(this.unescapePrefix, \"(.+?)\").concat(this.unescapeSuffix).concat(this.suffix);\n      this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');\n      var nestingRegexpStr = \"\".concat(this.nestingPrefix, \"(.+?)\").concat(this.nestingSuffix);\n      this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');\n    }\n  }, {\n    key: \"interpolate\",\n    value: function interpolate(str, data, lng, options) {\n      var _this = this;\n\n      var match;\n      var value;\n      var replaces;\n\n      function regexSafe(val) {\n        return val.replace(/\\$/g, '$$$$');\n      }\n\n      var handleFormat = function handleFormat(key) {\n        if (key.indexOf(_this.formatSeparator) < 0) return _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"getPath\"](data, key);\n        var p = key.split(_this.formatSeparator);\n        var k = p.shift().trim();\n        var f = p.join(_this.formatSeparator).trim();\n        return _this.format(_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"getPath\"](data, k), f, lng);\n      };\n\n      this.resetRegExp();\n      var missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;\n      replaces = 0; // unescape if has unescapePrefix/Suffix\n\n      /* eslint no-cond-assign: 0 */\n\n      while (match = this.regexpUnescape.exec(str)) {\n        value = handleFormat(match[1].trim());\n        str = str.replace(match[0], value);\n        this.regexpUnescape.lastIndex = 0;\n        replaces++;\n\n        if (replaces >= this.maxReplaces) {\n          break;\n        }\n      }\n\n      replaces = 0; // regular escape on demand\n\n      while (match = this.regexp.exec(str)) {\n        value = handleFormat(match[1].trim());\n\n        if (value === undefined) {\n          if (typeof missingInterpolationHandler === 'function') {\n            var temp = missingInterpolationHandler(str, match, options);\n            value = typeof temp === 'string' ? temp : '';\n          } else {\n            this.logger.warn(\"missed to pass in variable \".concat(match[1], \" for interpolating \").concat(str));\n            value = '';\n          }\n        } else if (typeof value !== 'string' && !this.useRawValueToEscape) {\n          value = _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"makeString\"](value);\n        }\n\n        value = this.escapeValue ? regexSafe(this.escape(value)) : regexSafe(value);\n        str = str.replace(match[0], value);\n        this.regexp.lastIndex = 0;\n        replaces++;\n\n        if (replaces >= this.maxReplaces) {\n          break;\n        }\n      }\n\n      return str;\n    }\n  }, {\n    key: \"nest\",\n    value: function nest(str, fc) {\n      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n      var match;\n      var value;\n\n      var clonedOptions = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, options);\n\n      clonedOptions.applyPostProcessor = false; // avoid post processing on nested lookup\n      // if value is something like \"myKey\": \"lorem $(anotherKey, { \"count\": {{aValueInOptions}} })\"\n\n      function handleHasOptions(key, inheritedOptions) {\n        if (key.indexOf(',') < 0) return key;\n        var p = key.split(',');\n        key = p.shift();\n        var optionsString = p.join(',');\n        optionsString = this.interpolate(optionsString, clonedOptions);\n        optionsString = optionsString.replace(/'/g, '\"');\n\n        try {\n          clonedOptions = JSON.parse(optionsString);\n          if (inheritedOptions) clonedOptions = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, inheritedOptions, clonedOptions);\n        } catch (e) {\n          this.logger.error(\"failed parsing options string in nesting for key \".concat(key), e);\n        }\n\n        return key;\n      } // regular escape on demand\n\n\n      while (match = this.nestingRegexp.exec(str)) {\n        value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions); // is only the nesting key (key1 = '$(key2)') return the value without stringify\n\n        if (value && match[0] === str && typeof value !== 'string') return value; // no string to include or empty\n\n        if (typeof value !== 'string') value = _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"makeString\"](value);\n\n        if (!value) {\n          this.logger.warn(\"missed to resolve \".concat(match[1], \" for nesting \").concat(str));\n          value = '';\n        } // Nested keys should not be escaped by default #854\n        // value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);\n\n\n        str = str.replace(match[0], value);\n        this.regexp.lastIndex = 0;\n      }\n\n      return str;\n    }\n  }]);\n\n  return Interpolator;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Interpolator);\n\n//# sourceURL=webpack:///./node_modules/i18next/dist/es/Interpolator.js?");

/***/ }),

/***/ "./node_modules/i18next/dist/es/LanguageUtils.js":
/*!*******************************************************!*\
  !*** ./node_modules/i18next/dist/es/LanguageUtils.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger.js */ \"./node_modules/i18next/dist/es/logger.js\");\n\n\n\n\nfunction capitalize(string) {\n  return string.charAt(0).toUpperCase() + string.slice(1);\n}\n\nvar LanguageUtil =\n/*#__PURE__*/\nfunction () {\n  function LanguageUtil(options) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LanguageUtil);\n\n    this.options = options;\n    this.whitelist = this.options.whitelist || false;\n    this.logger = _logger_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create('languageUtils');\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(LanguageUtil, [{\n    key: \"getScriptPartFromCode\",\n    value: function getScriptPartFromCode(code) {\n      if (!code || code.indexOf('-') < 0) return null;\n      var p = code.split('-');\n      if (p.length === 2) return null;\n      p.pop();\n      return this.formatLanguageCode(p.join('-'));\n    }\n  }, {\n    key: \"getLanguagePartFromCode\",\n    value: function getLanguagePartFromCode(code) {\n      if (!code || code.indexOf('-') < 0) return code;\n      var p = code.split('-');\n      return this.formatLanguageCode(p[0]);\n    }\n  }, {\n    key: \"formatLanguageCode\",\n    value: function formatLanguageCode(code) {\n      // http://www.iana.org/assignments/language-tags/language-tags.xhtml\n      if (typeof code === 'string' && code.indexOf('-') > -1) {\n        var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];\n        var p = code.split('-');\n\n        if (this.options.lowerCaseLng) {\n          p = p.map(function (part) {\n            return part.toLowerCase();\n          });\n        } else if (p.length === 2) {\n          p[0] = p[0].toLowerCase();\n          p[1] = p[1].toUpperCase();\n          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());\n        } else if (p.length === 3) {\n          p[0] = p[0].toLowerCase(); // if lenght 2 guess it's a country\n\n          if (p[1].length === 2) p[1] = p[1].toUpperCase();\n          if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();\n          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());\n          if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());\n        }\n\n        return p.join('-');\n      }\n\n      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;\n    }\n  }, {\n    key: \"isWhitelisted\",\n    value: function isWhitelisted(code) {\n      if (this.options.load === 'languageOnly' || this.options.nonExplicitWhitelist) {\n        code = this.getLanguagePartFromCode(code);\n      }\n\n      return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1;\n    }\n  }, {\n    key: \"getFallbackCodes\",\n    value: function getFallbackCodes(fallbacks, code) {\n      if (!fallbacks) return [];\n      if (typeof fallbacks === 'string') fallbacks = [fallbacks];\n      if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;\n      if (!code) return fallbacks.default || []; // asume we have an object defining fallbacks\n\n      var found = fallbacks[code];\n      if (!found) found = fallbacks[this.getScriptPartFromCode(code)];\n      if (!found) found = fallbacks[this.formatLanguageCode(code)];\n      if (!found) found = fallbacks.default;\n      return found || [];\n    }\n  }, {\n    key: \"toResolveHierarchy\",\n    value: function toResolveHierarchy(code, fallbackCode) {\n      var _this = this;\n\n      var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);\n      var codes = [];\n\n      var addCode = function addCode(c) {\n        if (!c) return;\n\n        if (_this.isWhitelisted(c)) {\n          codes.push(c);\n        } else {\n          _this.logger.warn(\"rejecting non-whitelisted language code: \".concat(c));\n        }\n      };\n\n      if (typeof code === 'string' && code.indexOf('-') > -1) {\n        if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));\n        if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));\n        if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));\n      } else if (typeof code === 'string') {\n        addCode(this.formatLanguageCode(code));\n      }\n\n      fallbackCodes.forEach(function (fc) {\n        if (codes.indexOf(fc) < 0) addCode(_this.formatLanguageCode(fc));\n      });\n      return codes;\n    }\n  }]);\n\n  return LanguageUtil;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LanguageUtil);\n\n//# sourceURL=webpack:///./node_modules/i18next/dist/es/LanguageUtils.js?");

/***/ }),

/***/ "./node_modules/i18next/dist/es/PluralResolver.js":
/*!********************************************************!*\
  !*** ./node_modules/i18next/dist/es/PluralResolver.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger.js */ \"./node_modules/i18next/dist/es/logger.js\");\n\n\n // definition http://translate.sourceforge.net/wiki/l10n/pluralforms\n\n/* eslint-disable */\n\nvar sets = [{\n  lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'ti', 'tr', 'uz', 'wa'],\n  nr: [1, 2],\n  fc: 1\n}, {\n  lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],\n  nr: [1, 2],\n  fc: 2\n}, {\n  lngs: ['ay', 'bo', 'cgg', 'fa', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],\n  nr: [1],\n  fc: 3\n}, {\n  lngs: ['be', 'bs', 'dz', 'hr', 'ru', 'sr', 'uk'],\n  nr: [1, 2, 5],\n  fc: 4\n}, {\n  lngs: ['ar'],\n  nr: [0, 1, 2, 3, 11, 100],\n  fc: 5\n}, {\n  lngs: ['cs', 'sk'],\n  nr: [1, 2, 5],\n  fc: 6\n}, {\n  lngs: ['csb', 'pl'],\n  nr: [1, 2, 5],\n  fc: 7\n}, {\n  lngs: ['cy'],\n  nr: [1, 2, 3, 8],\n  fc: 8\n}, {\n  lngs: ['fr'],\n  nr: [1, 2],\n  fc: 9\n}, {\n  lngs: ['ga'],\n  nr: [1, 2, 3, 7, 11],\n  fc: 10\n}, {\n  lngs: ['gd'],\n  nr: [1, 2, 3, 20],\n  fc: 11\n}, {\n  lngs: ['is'],\n  nr: [1, 2],\n  fc: 12\n}, {\n  lngs: ['jv'],\n  nr: [0, 1],\n  fc: 13\n}, {\n  lngs: ['kw'],\n  nr: [1, 2, 3, 4],\n  fc: 14\n}, {\n  lngs: ['lt'],\n  nr: [1, 2, 10],\n  fc: 15\n}, {\n  lngs: ['lv'],\n  nr: [1, 2, 0],\n  fc: 16\n}, {\n  lngs: ['mk'],\n  nr: [1, 2],\n  fc: 17\n}, {\n  lngs: ['mnk'],\n  nr: [0, 1, 2],\n  fc: 18\n}, {\n  lngs: ['mt'],\n  nr: [1, 2, 11, 20],\n  fc: 19\n}, {\n  lngs: ['or'],\n  nr: [2, 1],\n  fc: 2\n}, {\n  lngs: ['ro'],\n  nr: [1, 2, 20],\n  fc: 20\n}, {\n  lngs: ['sl'],\n  nr: [5, 1, 2, 3],\n  fc: 21\n}, {\n  lngs: ['he'],\n  nr: [1, 2, 20, 21],\n  fc: 22\n}];\nvar _rulesPluralsTypes = {\n  1: function _(n) {\n    return Number(n > 1);\n  },\n  2: function _(n) {\n    return Number(n != 1);\n  },\n  3: function _(n) {\n    return 0;\n  },\n  4: function _(n) {\n    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);\n  },\n  5: function _(n) {\n    return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);\n  },\n  6: function _(n) {\n    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);\n  },\n  7: function _(n) {\n    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);\n  },\n  8: function _(n) {\n    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);\n  },\n  9: function _(n) {\n    return Number(n >= 2);\n  },\n  10: function _(n) {\n    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);\n  },\n  11: function _(n) {\n    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);\n  },\n  12: function _(n) {\n    return Number(n % 10 != 1 || n % 100 == 11);\n  },\n  13: function _(n) {\n    return Number(n !== 0);\n  },\n  14: function _(n) {\n    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);\n  },\n  15: function _(n) {\n    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);\n  },\n  16: function _(n) {\n    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);\n  },\n  17: function _(n) {\n    return Number(n == 1 || n % 10 == 1 ? 0 : 1);\n  },\n  18: function _(n) {\n    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);\n  },\n  19: function _(n) {\n    return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);\n  },\n  20: function _(n) {\n    return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);\n  },\n  21: function _(n) {\n    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);\n  },\n  22: function _(n) {\n    return Number(n === 1 ? 0 : n === 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);\n  }\n};\n/* eslint-enable */\n\nfunction createRules() {\n  var rules = {};\n  sets.forEach(function (set) {\n    set.lngs.forEach(function (l) {\n      rules[l] = {\n        numbers: set.nr,\n        plurals: _rulesPluralsTypes[set.fc]\n      };\n    });\n  });\n  return rules;\n}\n\nvar PluralResolver =\n/*#__PURE__*/\nfunction () {\n  function PluralResolver(languageUtils) {\n    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PluralResolver);\n\n    this.languageUtils = languageUtils;\n    this.options = options;\n    this.logger = _logger_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create('pluralResolver');\n    this.rules = createRules();\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(PluralResolver, [{\n    key: \"addRule\",\n    value: function addRule(lng, obj) {\n      this.rules[lng] = obj;\n    }\n  }, {\n    key: \"getRule\",\n    value: function getRule(code) {\n      return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];\n    }\n  }, {\n    key: \"needsPlural\",\n    value: function needsPlural(code) {\n      var rule = this.getRule(code);\n      return rule && rule.numbers.length > 1;\n    }\n  }, {\n    key: \"getPluralFormsOfKey\",\n    value: function getPluralFormsOfKey(code, key) {\n      var _this = this;\n\n      var ret = [];\n      var rule = this.getRule(code);\n      if (!rule) return ret;\n      rule.numbers.forEach(function (n) {\n        var suffix = _this.getSuffix(code, n);\n\n        ret.push(\"\".concat(key).concat(suffix));\n      });\n      return ret;\n    }\n  }, {\n    key: \"getSuffix\",\n    value: function getSuffix(code, count) {\n      var _this2 = this;\n\n      var rule = this.getRule(code);\n\n      if (rule) {\n        // if (rule.numbers.length === 1) return ''; // only singular\n        var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));\n        var suffix = rule.numbers[idx]; // special treatment for lngs only having singular and plural\n\n        if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {\n          if (suffix === 2) {\n            suffix = 'plural';\n          } else if (suffix === 1) {\n            suffix = '';\n          }\n        }\n\n        var returnSuffix = function returnSuffix() {\n          return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();\n        }; // COMPATIBILITY JSON\n        // v1\n\n\n        if (this.options.compatibilityJSON === 'v1') {\n          if (suffix === 1) return '';\n          if (typeof suffix === 'number') return \"_plural_\".concat(suffix.toString());\n          return returnSuffix();\n        } else if (\n        /* v2 */\n        this.options.compatibilityJSON === 'v2') {\n          return returnSuffix();\n        } else if (\n        /* v3 - gettext index */\n        this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {\n          return returnSuffix();\n        }\n\n        return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();\n      }\n\n      this.logger.warn(\"no plural rule found for: \".concat(code));\n      return '';\n    }\n  }]);\n\n  return PluralResolver;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (PluralResolver);\n\n//# sourceURL=webpack:///./node_modules/i18next/dist/es/PluralResolver.js?");

/***/ }),

/***/ "./node_modules/i18next/dist/es/ResourceStore.js":
/*!*******************************************************!*\
  !*** ./node_modules/i18next/dist/es/ResourceStore.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"./node_modules/@babel/runtime/helpers/objectSpread.js\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _EventEmitter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EventEmitter.js */ \"./node_modules/i18next/dist/es/EventEmitter.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils.js */ \"./node_modules/i18next/dist/es/utils.js\");\n\n\n\n\n\n\n\n\n\n\nvar ResourceStore =\n/*#__PURE__*/\nfunction (_EventEmitter) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ResourceStore, _EventEmitter);\n\n  function ResourceStore(data) {\n    var _this;\n\n    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {\n      ns: ['translation'],\n      defaultNS: 'translation'\n    };\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ResourceStore);\n\n    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ResourceStore).call(this));\n    _EventEmitter_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"].call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this))); // <=IE10 fix (unable to call parent constructor)\n\n    _this.data = data || {};\n    _this.options = options;\n\n    if (_this.options.keySeparator === undefined) {\n      _this.options.keySeparator = '.';\n    }\n\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ResourceStore, [{\n    key: \"addNamespaces\",\n    value: function addNamespaces(ns) {\n      if (this.options.ns.indexOf(ns) < 0) {\n        this.options.ns.push(ns);\n      }\n    }\n  }, {\n    key: \"removeNamespaces\",\n    value: function removeNamespaces(ns) {\n      var index = this.options.ns.indexOf(ns);\n\n      if (index > -1) {\n        this.options.ns.splice(index, 1);\n      }\n    }\n  }, {\n    key: \"getResource\",\n    value: function getResource(lng, ns, key) {\n      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;\n      var path = [lng, ns];\n      if (key && typeof key !== 'string') path = path.concat(key);\n      if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);\n\n      if (lng.indexOf('.') > -1) {\n        path = lng.split('.');\n      }\n\n      return _utils_js__WEBPACK_IMPORTED_MODULE_8__[\"getPath\"](this.data, path);\n    }\n  }, {\n    key: \"addResource\",\n    value: function addResource(lng, ns, key, value) {\n      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {\n        silent: false\n      };\n      var keySeparator = this.options.keySeparator;\n      if (keySeparator === undefined) keySeparator = '.';\n      var path = [lng, ns];\n      if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);\n\n      if (lng.indexOf('.') > -1) {\n        path = lng.split('.');\n        value = ns;\n        ns = path[1];\n      }\n\n      this.addNamespaces(ns);\n      _utils_js__WEBPACK_IMPORTED_MODULE_8__[\"setPath\"](this.data, path, value);\n      if (!options.silent) this.emit('added', lng, ns, key, value);\n    }\n  }, {\n    key: \"addResources\",\n    value: function addResources(lng, ns, resources) {\n      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {\n        silent: false\n      };\n\n      /* eslint no-restricted-syntax: 0 */\n      for (var m in resources) {\n        if (typeof resources[m] === 'string' || Object.prototype.toString.apply(resources[m]) === '[object Array]') this.addResource(lng, ns, m, resources[m], {\n          silent: true\n        });\n      }\n\n      if (!options.silent) this.emit('added', lng, ns, resources);\n    }\n  }, {\n    key: \"addResourceBundle\",\n    value: function addResourceBundle(lng, ns, resources, deep, overwrite) {\n      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {\n        silent: false\n      };\n      var path = [lng, ns];\n\n      if (lng.indexOf('.') > -1) {\n        path = lng.split('.');\n        deep = resources;\n        resources = ns;\n        ns = path[1];\n      }\n\n      this.addNamespaces(ns);\n      var pack = _utils_js__WEBPACK_IMPORTED_MODULE_8__[\"getPath\"](this.data, path) || {};\n\n      if (deep) {\n        _utils_js__WEBPACK_IMPORTED_MODULE_8__[\"deepExtend\"](pack, resources, overwrite);\n      } else {\n        pack = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, pack, resources);\n      }\n\n      _utils_js__WEBPACK_IMPORTED_MODULE_8__[\"setPath\"](this.data, path, pack);\n      if (!options.silent) this.emit('added', lng, ns, resources);\n    }\n  }, {\n    key: \"removeResourceBundle\",\n    value: function removeResourceBundle(lng, ns) {\n      if (this.hasResourceBundle(lng, ns)) {\n        delete this.data[lng][ns];\n      }\n\n      this.removeNamespaces(ns);\n      this.emit('removed', lng, ns);\n    }\n  }, {\n    key: \"hasResourceBundle\",\n    value: function hasResourceBundle(lng, ns) {\n      return this.getResource(lng, ns) !== undefined;\n    }\n  }, {\n    key: \"getResourceBundle\",\n    value: function getResourceBundle(lng, ns) {\n      if (!ns) ns = this.options.defaultNS; // COMPATIBILITY: remove extend in v2.1.0\n\n      if (this.options.compatibilityAPI === 'v1') return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, {}, this.getResource(lng, ns));\n      return this.getResource(lng, ns);\n    }\n  }, {\n    key: \"getDataByLanguage\",\n    value: function getDataByLanguage(lng) {\n      return this.data[lng];\n    }\n  }, {\n    key: \"toJSON\",\n    value: function toJSON() {\n      return this.data;\n    }\n  }]);\n\n  return ResourceStore;\n}(_EventEmitter_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ResourceStore);\n\n//# sourceURL=webpack:///./node_modules/i18next/dist/es/ResourceStore.js?");

/***/ }),

/***/ "./node_modules/i18next/dist/es/Translator.js":
/*!****************************************************!*\
  !*** ./node_modules/i18next/dist/es/Translator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"./node_modules/@babel/runtime/helpers/objectSpread.js\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./logger.js */ \"./node_modules/i18next/dist/es/logger.js\");\n/* harmony import */ var _EventEmitter_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./EventEmitter.js */ \"./node_modules/i18next/dist/es/EventEmitter.js\");\n/* harmony import */ var _postProcessor_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./postProcessor.js */ \"./node_modules/i18next/dist/es/postProcessor.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils.js */ \"./node_modules/i18next/dist/es/utils.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar Translator =\n/*#__PURE__*/\nfunction (_EventEmitter) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(Translator, _EventEmitter);\n\n  function Translator(services) {\n    var _this;\n\n    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Translator);\n\n    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Translator).call(this));\n    _EventEmitter_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"].call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this))); // <=IE10 fix (unable to call parent constructor)\n\n    _utils_js__WEBPACK_IMPORTED_MODULE_11__[\"copy\"](['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat'], services, _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this)));\n    _this.options = options;\n\n    if (_this.options.keySeparator === undefined) {\n      _this.options.keySeparator = '.';\n    }\n\n    _this.logger = _logger_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"].create('translator');\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Translator, [{\n    key: \"changeLanguage\",\n    value: function changeLanguage(lng) {\n      if (lng) this.language = lng;\n    }\n  }, {\n    key: \"exists\",\n    value: function exists(key) {\n      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {\n        interpolation: {}\n      };\n      var resolved = this.resolve(key, options);\n      return resolved && resolved.res !== undefined;\n    }\n  }, {\n    key: \"extractFromKey\",\n    value: function extractFromKey(key, options) {\n      var nsSeparator = options.nsSeparator || this.options.nsSeparator;\n      if (nsSeparator === undefined) nsSeparator = ':';\n      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;\n      var namespaces = options.ns || this.options.defaultNS;\n\n      if (nsSeparator && key.indexOf(nsSeparator) > -1) {\n        var parts = key.split(nsSeparator);\n        if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();\n        key = parts.join(keySeparator);\n      }\n\n      if (typeof namespaces === 'string') namespaces = [namespaces];\n      return {\n        key: key,\n        namespaces: namespaces\n      };\n    }\n  }, {\n    key: \"translate\",\n    value: function translate(keys, options) {\n      var _this2 = this;\n\n      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(options) !== 'object' && this.options.overloadTranslationOptionHandler) {\n        /* eslint prefer-rest-params: 0 */\n        options = this.options.overloadTranslationOptionHandler(arguments);\n      }\n\n      if (!options) options = {}; // non valid keys handling\n\n      if (keys === undefined || keys === null) return '';\n      if (!Array.isArray(keys)) keys = [String(keys)]; // separators\n\n      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator; // get namespace(s)\n\n      var _this$extractFromKey = this.extractFromKey(keys[keys.length - 1], options),\n          key = _this$extractFromKey.key,\n          namespaces = _this$extractFromKey.namespaces;\n\n      var namespace = namespaces[namespaces.length - 1]; // return key on CIMode\n\n      var lng = options.lng || this.language;\n      var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;\n\n      if (lng && lng.toLowerCase() === 'cimode') {\n        if (appendNamespaceToCIMode) {\n          var nsSeparator = options.nsSeparator || this.options.nsSeparator;\n          return namespace + nsSeparator + key;\n        }\n\n        return key;\n      } // resolve from store\n\n\n      var resolved = this.resolve(keys, options);\n      var res = resolved && resolved.res;\n      var resUsedKey = resolved && resolved.usedKey || key;\n      var resExactUsedKey = resolved && resolved.exactUsedKey || key;\n      var resType = Object.prototype.toString.apply(res);\n      var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];\n      var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays; // object\n\n      var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;\n      var handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';\n\n      if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === 'string' && resType === '[object Array]')) {\n        if (!options.returnObjects && !this.options.returnObjects) {\n          this.logger.warn('accessing an object - but returnObjects options is not enabled!');\n          return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, options) : \"key '\".concat(key, \" (\").concat(this.language, \")' returned an object instead of string.\");\n        } // if we got a separator we loop over children - else we just return object as is\n        // as having it set to false means no hierarchy so no lookup for nested values\n\n\n        if (keySeparator) {\n          var resTypeIsArray = resType === '[object Array]';\n          var copy = resTypeIsArray ? [] : {}; // apply child translation on a copy\n\n          /* eslint no-restricted-syntax: 0 */\n\n          var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;\n\n          for (var m in res) {\n            if (Object.prototype.hasOwnProperty.call(res, m)) {\n              var deepKey = \"\".concat(newKeyToUse).concat(keySeparator).concat(m);\n              copy[m] = this.translate(deepKey, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, options, {\n                joinArrays: false,\n                ns: namespaces\n              }));\n              if (copy[m] === deepKey) copy[m] = res[m]; // if nothing found use orginal value as fallback\n            }\n          }\n\n          res = copy;\n        }\n      } else if (handleAsObjectInI18nFormat && typeof joinArrays === 'string' && resType === '[object Array]') {\n        // array special treatment\n        res = res.join(joinArrays);\n        if (res) res = this.extendTranslation(res, keys, options);\n      } else {\n        // string, empty or null\n        var usedDefault = false;\n        var usedKey = false; // fallback value\n\n        if (!this.isValidLookup(res) && options.defaultValue !== undefined) {\n          usedDefault = true;\n\n          if (options.count !== undefined) {\n            var suffix = this.pluralResolver.getSuffix(lng, options.count);\n            res = options[\"defaultValue\".concat(suffix)];\n          }\n\n          if (!res) res = options.defaultValue;\n        }\n\n        if (!this.isValidLookup(res)) {\n          usedKey = true;\n          res = key;\n        } // save missing\n\n\n        var updateMissing = options.defaultValue && options.defaultValue !== res && this.options.updateMissing;\n\n        if (usedKey || usedDefault || updateMissing) {\n          this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? options.defaultValue : res);\n          var lngs = [];\n          var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);\n\n          if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {\n            for (var i = 0; i < fallbackLngs.length; i++) {\n              lngs.push(fallbackLngs[i]);\n            }\n          } else if (this.options.saveMissingTo === 'all') {\n            lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);\n          } else {\n            lngs.push(options.lng || this.language);\n          }\n\n          var send = function send(l, k) {\n            if (_this2.options.missingKeyHandler) {\n              _this2.options.missingKeyHandler(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);\n            } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {\n              _this2.backendConnector.saveMissing(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);\n            }\n\n            _this2.emit('missingKey', l, namespace, k, res);\n          };\n\n          if (this.options.saveMissing) {\n            var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';\n\n            if (this.options.saveMissingPlurals && needsPluralHandling) {\n              lngs.forEach(function (l) {\n                var plurals = _this2.pluralResolver.getPluralFormsOfKey(l, key);\n\n                plurals.forEach(function (p) {\n                  return send([l], p);\n                });\n              });\n            } else {\n              send(lngs, key);\n            }\n          }\n        } // extend\n\n\n        res = this.extendTranslation(res, keys, options, resolved); // append namespace if still key\n\n        if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = \"\".concat(namespace, \":\").concat(key); // parseMissingKeyHandler\n\n        if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);\n      } // return\n\n\n      return res;\n    }\n  }, {\n    key: \"extendTranslation\",\n    value: function extendTranslation(res, key, options, resolved) {\n      var _this3 = this;\n\n      if (this.i18nFormat && this.i18nFormat.parse) {\n        res = this.i18nFormat.parse(res, options, resolved.usedLng, resolved.usedNS, resolved.usedKey, {\n          resolved: resolved\n        });\n      } else if (!options.skipInterpolation) {\n        // i18next.parsing\n        if (options.interpolation) this.interpolator.init(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, options, {\n          interpolation: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, this.options.interpolation, options.interpolation)\n        })); // interpolate\n\n        var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;\n        if (this.options.interpolation.defaultVariables) data = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, this.options.interpolation.defaultVariables, data);\n        res = this.interpolator.interpolate(res, data, options.lng || this.language, options); // nesting\n\n        if (options.nest !== false) res = this.interpolator.nest(res, function () {\n          return _this3.translate.apply(_this3, arguments);\n        }, options);\n        if (options.interpolation) this.interpolator.reset();\n      } // post process\n\n\n      var postProcess = options.postProcess || this.options.postProcess;\n      var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;\n\n      if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {\n        res = _postProcessor_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"].handle(postProcessorNames, res, key, options, this);\n      }\n\n      return res;\n    }\n  }, {\n    key: \"resolve\",\n    value: function resolve(keys) {\n      var _this4 = this;\n\n      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n      var found;\n      var usedKey; // plain key\n\n      var exactUsedKey; // key with context / plural\n\n      var usedLng;\n      var usedNS;\n      if (typeof keys === 'string') keys = [keys]; // forEach possible key\n\n      keys.forEach(function (k) {\n        if (_this4.isValidLookup(found)) return;\n\n        var extracted = _this4.extractFromKey(k, options);\n\n        var key = extracted.key;\n        usedKey = key;\n        var namespaces = extracted.namespaces;\n        if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);\n        var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';\n        var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';\n        var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language, options.fallbackLng);\n        namespaces.forEach(function (ns) {\n          if (_this4.isValidLookup(found)) return;\n          usedNS = ns;\n          codes.forEach(function (code) {\n            if (_this4.isValidLookup(found)) return;\n            usedLng = code;\n            var finalKey = key;\n            var finalKeys = [finalKey];\n\n            if (_this4.i18nFormat && _this4.i18nFormat.addLookupKeys) {\n              _this4.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);\n            } else {\n              var pluralSuffix;\n              if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count); // fallback for plural if context not found\n\n              if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix); // get key for context if needed\n\n              if (needsContextHandling) finalKeys.push(finalKey += \"\".concat(_this4.options.contextSeparator).concat(options.context)); // get key for plural if needed\n\n              if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);\n            } // iterate over finalKeys starting with most specific pluralkey (-> contextkey only) -> singularkey only\n\n\n            var possibleKey;\n            /* eslint no-cond-assign: 0 */\n\n            while (possibleKey = finalKeys.pop()) {\n              if (!_this4.isValidLookup(found)) {\n                exactUsedKey = possibleKey;\n                found = _this4.getResource(code, ns, possibleKey, options);\n              }\n            }\n          });\n        });\n      });\n      return {\n        res: found,\n        usedKey: usedKey,\n        exactUsedKey: exactUsedKey,\n        usedLng: usedLng,\n        usedNS: usedNS\n      };\n    }\n  }, {\n    key: \"isValidLookup\",\n    value: function isValidLookup(res) {\n      return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');\n    }\n  }, {\n    key: \"getResource\",\n    value: function getResource(code, ns, key) {\n      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n      if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);\n      return this.resourceStore.getResource(code, ns, key, options);\n    }\n  }]);\n\n  return Translator;\n}(_EventEmitter_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Translator);\n\n//# sourceURL=webpack:///./node_modules/i18next/dist/es/Translator.js?");

/***/ }),

/***/ "./node_modules/i18next/dist/es/defaults.js":
/*!**************************************************!*\
  !*** ./node_modules/i18next/dist/es/defaults.js ***!
  \**************************************************/
/*! exports provided: get, transformOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get\", function() { return get; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"transformOptions\", function() { return transformOptions; });\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction get() {\n  return {\n    debug: false,\n    initImmediate: true,\n    ns: ['translation'],\n    defaultNS: ['translation'],\n    fallbackLng: ['dev'],\n    fallbackNS: false,\n    // string or array of namespaces\n    whitelist: false,\n    // array with whitelisted languages\n    nonExplicitWhitelist: false,\n    load: 'all',\n    // | currentOnly | languageOnly\n    preload: false,\n    // array with preload languages\n    simplifyPluralSuffix: true,\n    keySeparator: '.',\n    nsSeparator: ':',\n    pluralSeparator: '_',\n    contextSeparator: '_',\n    partialBundledLanguages: false,\n    // allow bundling certain languages that are not remotely fetched\n    saveMissing: false,\n    // enable to send missing values\n    updateMissing: false,\n    // enable to update default values if different from translated value (only useful on initial development, or when keeping code as source of truth)\n    saveMissingTo: 'fallback',\n    // 'current' || 'all'\n    saveMissingPlurals: true,\n    // will save all forms not only singular key\n    missingKeyHandler: false,\n    // function(lng, ns, key, fallbackValue) -> override if prefer on handling\n    missingInterpolationHandler: false,\n    // function(str, match)\n    postProcess: false,\n    // string or array of postProcessor names\n    returnNull: true,\n    // allows null value as valid translation\n    returnEmptyString: true,\n    // allows empty string value as valid translation\n    returnObjects: false,\n    joinArrays: false,\n    // or string to join array\n    returnedObjectHandler: function returnedObjectHandler() {},\n    // function(key, value, options) triggered if key returns object but returnObjects is set to false\n    parseMissingKeyHandler: false,\n    // function(key) parsed a key that was not found in t() before returning\n    appendNamespaceToMissingKey: false,\n    appendNamespaceToCIMode: false,\n    overloadTranslationOptionHandler: function handle(args) {\n      var ret = {};\n      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(args[1]) === 'object') ret = args[1];\n      if (typeof args[1] === 'string') ret.defaultValue = args[1];\n      if (typeof args[2] === 'string') ret.tDescription = args[2];\n\n      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(args[2]) === 'object' || _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(args[3]) === 'object') {\n        var options = args[3] || args[2];\n        Object.keys(options).forEach(function (key) {\n          ret[key] = options[key];\n        });\n      }\n\n      return ret;\n    },\n    interpolation: {\n      escapeValue: true,\n      format: function format(value, _format, lng) {\n        return value;\n      },\n      prefix: '{{',\n      suffix: '}}',\n      formatSeparator: ',',\n      // prefixEscaped: '{{',\n      // suffixEscaped: '}}',\n      // unescapeSuffix: '',\n      unescapePrefix: '-',\n      nestingPrefix: '$t(',\n      nestingSuffix: ')',\n      // nestingPrefixEscaped: '$t(',\n      // nestingSuffixEscaped: ')',\n      // defaultVariables: undefined // object that can have values to interpolate on - extends passed in interpolation data\n      maxReplaces: 1000 // max replaces to prevent endless loop\n\n    }\n  };\n}\n/* eslint no-param-reassign: 0 */\n\nfunction transformOptions(options) {\n  // create namespace object if namespace is passed in as string\n  if (typeof options.ns === 'string') options.ns = [options.ns];\n  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];\n  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS]; // extend whitelist with cimode\n\n  if (options.whitelist && options.whitelist.indexOf('cimode') < 0) {\n    options.whitelist = options.whitelist.concat(['cimode']);\n  }\n\n  return options;\n}\n\n//# sourceURL=webpack:///./node_modules/i18next/dist/es/defaults.js?");

/***/ }),

/***/ "./node_modules/i18next/dist/es/i18next.js":
/*!*************************************************!*\
  !*** ./node_modules/i18next/dist/es/i18next.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"./node_modules/@babel/runtime/helpers/objectSpread.js\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./logger.js */ \"./node_modules/i18next/dist/es/logger.js\");\n/* harmony import */ var _EventEmitter_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./EventEmitter.js */ \"./node_modules/i18next/dist/es/EventEmitter.js\");\n/* harmony import */ var _ResourceStore_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ResourceStore.js */ \"./node_modules/i18next/dist/es/ResourceStore.js\");\n/* harmony import */ var _Translator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Translator.js */ \"./node_modules/i18next/dist/es/Translator.js\");\n/* harmony import */ var _LanguageUtils_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./LanguageUtils.js */ \"./node_modules/i18next/dist/es/LanguageUtils.js\");\n/* harmony import */ var _PluralResolver_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./PluralResolver.js */ \"./node_modules/i18next/dist/es/PluralResolver.js\");\n/* harmony import */ var _Interpolator_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Interpolator.js */ \"./node_modules/i18next/dist/es/Interpolator.js\");\n/* harmony import */ var _BackendConnector_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./BackendConnector.js */ \"./node_modules/i18next/dist/es/BackendConnector.js\");\n/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./defaults.js */ \"./node_modules/i18next/dist/es/defaults.js\");\n/* harmony import */ var _postProcessor_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./postProcessor.js */ \"./node_modules/i18next/dist/es/postProcessor.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./utils.js */ \"./node_modules/i18next/dist/es/utils.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction noop() {}\n\nvar I18n =\n/*#__PURE__*/\nfunction (_EventEmitter) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(I18n, _EventEmitter);\n\n  function I18n() {\n    var _this;\n\n    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n    var callback = arguments.length > 1 ? arguments[1] : undefined;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, I18n);\n\n    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(I18n).call(this));\n    _EventEmitter_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"].call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this))); // <=IE10 fix (unable to call parent constructor)\n\n    _this.options = Object(_defaults_js__WEBPACK_IMPORTED_MODULE_16__[\"transformOptions\"])(options);\n    _this.services = {};\n    _this.logger = _logger_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"];\n    _this.modules = {\n      external: []\n    };\n\n    if (callback && !_this.isInitialized && !options.isClone) {\n      // https://github.com/i18next/i18next/issues/879\n      if (!_this.options.initImmediate) {\n        _this.init(options, callback);\n\n        return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(_this, _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this)));\n      }\n\n      setTimeout(function () {\n        _this.init(options, callback);\n      }, 0);\n    }\n\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(I18n, [{\n    key: \"init\",\n    value: function init() {\n      var _this2 = this;\n\n      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n      var callback = arguments.length > 1 ? arguments[1] : undefined;\n\n      if (typeof options === 'function') {\n        callback = options;\n        options = {};\n      }\n\n      this.options = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, Object(_defaults_js__WEBPACK_IMPORTED_MODULE_16__[\"get\"])(), this.options, Object(_defaults_js__WEBPACK_IMPORTED_MODULE_16__[\"transformOptions\"])(options));\n      this.format = this.options.interpolation.format;\n      if (!callback) callback = noop;\n\n      function createClassOnDemand(ClassOrObject) {\n        if (!ClassOrObject) return null;\n        if (typeof ClassOrObject === 'function') return new ClassOrObject();\n        return ClassOrObject;\n      } // init services\n\n\n      if (!this.options.isClone) {\n        if (this.modules.logger) {\n          _logger_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"].init(createClassOnDemand(this.modules.logger), this.options);\n        } else {\n          _logger_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"].init(null, this.options);\n        }\n\n        var lu = new _LanguageUtils_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"](this.options);\n        this.store = new _ResourceStore_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"](this.options.resources, this.options);\n        var s = this.services;\n        s.logger = _logger_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"];\n        s.resourceStore = this.store;\n        s.languageUtils = lu;\n        s.pluralResolver = new _PluralResolver_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"](lu, {\n          prepend: this.options.pluralSeparator,\n          compatibilityJSON: this.options.compatibilityJSON,\n          simplifyPluralSuffix: this.options.simplifyPluralSuffix\n        });\n        s.interpolator = new _Interpolator_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"](this.options);\n        s.backendConnector = new _BackendConnector_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"](createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options); // pipe events from backendConnector\n\n        s.backendConnector.on('*', function (event) {\n          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n            args[_key - 1] = arguments[_key];\n          }\n\n          _this2.emit.apply(_this2, [event].concat(args));\n        });\n\n        if (this.modules.languageDetector) {\n          s.languageDetector = createClassOnDemand(this.modules.languageDetector);\n          s.languageDetector.init(s, this.options.detection, this.options);\n        }\n\n        if (this.modules.i18nFormat) {\n          s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);\n          if (s.i18nFormat.init) s.i18nFormat.init(this);\n        }\n\n        this.translator = new _Translator_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"](this.services, this.options); // pipe events from translator\n\n        this.translator.on('*', function (event) {\n          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n            args[_key2 - 1] = arguments[_key2];\n          }\n\n          _this2.emit.apply(_this2, [event].concat(args));\n        });\n        this.modules.external.forEach(function (m) {\n          if (m.init) m.init(_this2);\n        });\n      } // append api\n\n\n      var storeApi = ['getResource', 'addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];\n      storeApi.forEach(function (fcName) {\n        _this2[fcName] = function () {\n          var _this2$store;\n\n          return (_this2$store = _this2.store)[fcName].apply(_this2$store, arguments);\n        };\n      });\n      var deferred = Object(_utils_js__WEBPACK_IMPORTED_MODULE_18__[\"defer\"])();\n\n      var load = function load() {\n        _this2.changeLanguage(_this2.options.lng, function (err, t) {\n          _this2.isInitialized = true;\n\n          _this2.logger.log('initialized', _this2.options);\n\n          _this2.emit('initialized', _this2.options);\n\n          deferred.resolve(t); // not rejecting on err (as err is only a loading translation failed warning)\n\n          callback(err, t);\n        });\n      };\n\n      if (this.options.resources || !this.options.initImmediate) {\n        load();\n      } else {\n        setTimeout(load, 0);\n      }\n\n      return deferred;\n    }\n    /* eslint consistent-return: 0 */\n\n  }, {\n    key: \"loadResources\",\n    value: function loadResources() {\n      var _this3 = this;\n\n      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;\n\n      if (!this.options.resources || this.options.partialBundledLanguages) {\n        if (this.language && this.language.toLowerCase() === 'cimode') return callback(); // avoid loading resources for cimode\n\n        var toLoad = [];\n\n        var append = function append(lng) {\n          if (!lng) return;\n\n          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);\n\n          lngs.forEach(function (l) {\n            if (toLoad.indexOf(l) < 0) toLoad.push(l);\n          });\n        };\n\n        if (!this.language) {\n          // at least load fallbacks in this case\n          var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);\n          fallbacks.forEach(function (l) {\n            return append(l);\n          });\n        } else {\n          append(this.language);\n        }\n\n        if (this.options.preload) {\n          this.options.preload.forEach(function (l) {\n            return append(l);\n          });\n        }\n\n        this.services.backendConnector.load(toLoad, this.options.ns, callback);\n      } else {\n        callback(null);\n      }\n    }\n  }, {\n    key: \"reloadResources\",\n    value: function reloadResources(lngs, ns, callback) {\n      var deferred = Object(_utils_js__WEBPACK_IMPORTED_MODULE_18__[\"defer\"])();\n      if (!lngs) lngs = this.languages;\n      if (!ns) ns = this.options.ns;\n      if (!callback) callback = noop;\n      this.services.backendConnector.reload(lngs, ns, function (err) {\n        deferred.resolve(); // not rejecting on err (as err is only a loading translation failed warning)\n\n        callback(err);\n      });\n      return deferred;\n    }\n  }, {\n    key: \"use\",\n    value: function use(module) {\n      if (module.type === 'backend') {\n        this.modules.backend = module;\n      }\n\n      if (module.type === 'logger' || module.log && module.warn && module.error) {\n        this.modules.logger = module;\n      }\n\n      if (module.type === 'languageDetector') {\n        this.modules.languageDetector = module;\n      }\n\n      if (module.type === 'i18nFormat') {\n        this.modules.i18nFormat = module;\n      }\n\n      if (module.type === 'postProcessor') {\n        _postProcessor_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"].addPostProcessor(module);\n      }\n\n      if (module.type === '3rdParty') {\n        this.modules.external.push(module);\n      }\n\n      return this;\n    }\n  }, {\n    key: \"changeLanguage\",\n    value: function changeLanguage(lng, callback) {\n      var _this4 = this;\n\n      var deferred = Object(_utils_js__WEBPACK_IMPORTED_MODULE_18__[\"defer\"])();\n      this.emit('languageChanging', lng);\n\n      var done = function done(err, l) {\n        _this4.translator.changeLanguage(l);\n\n        if (l) {\n          _this4.emit('languageChanged', l);\n\n          _this4.logger.log('languageChanged', l);\n        }\n\n        deferred.resolve(function () {\n          return _this4.t.apply(_this4, arguments);\n        });\n        if (callback) callback(err, function () {\n          return _this4.t.apply(_this4, arguments);\n        });\n      };\n\n      var setLng = function setLng(l) {\n        if (l) {\n          _this4.language = l;\n          _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);\n          if (!_this4.translator.language) _this4.translator.changeLanguage(l);\n          if (_this4.services.languageDetector) _this4.services.languageDetector.cacheUserLanguage(l);\n        }\n\n        _this4.loadResources(function (err) {\n          done(err, l);\n        });\n      };\n\n      if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {\n        setLng(this.services.languageDetector.detect());\n      } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {\n        this.services.languageDetector.detect(setLng);\n      } else {\n        setLng(lng);\n      }\n\n      return deferred;\n    }\n  }, {\n    key: \"getFixedT\",\n    value: function getFixedT(lng, ns) {\n      var _this5 = this;\n\n      var fixedT = function fixedT(key, opts) {\n        var options = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, opts);\n\n        if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(opts) !== 'object') {\n          for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {\n            rest[_key3 - 2] = arguments[_key3];\n          }\n\n          options = _this5.options.overloadTranslationOptionHandler([key, opts].concat(rest));\n        }\n\n        options.lng = options.lng || fixedT.lng;\n        options.lngs = options.lngs || fixedT.lngs;\n        options.ns = options.ns || fixedT.ns;\n        return _this5.t(key, options);\n      };\n\n      if (typeof lng === 'string') {\n        fixedT.lng = lng;\n      } else {\n        fixedT.lngs = lng;\n      }\n\n      fixedT.ns = ns;\n      return fixedT;\n    }\n  }, {\n    key: \"t\",\n    value: function t() {\n      var _this$translator;\n\n      return this.translator && (_this$translator = this.translator).translate.apply(_this$translator, arguments);\n    }\n  }, {\n    key: \"exists\",\n    value: function exists() {\n      var _this$translator2;\n\n      return this.translator && (_this$translator2 = this.translator).exists.apply(_this$translator2, arguments);\n    }\n  }, {\n    key: \"setDefaultNamespace\",\n    value: function setDefaultNamespace(ns) {\n      this.options.defaultNS = ns;\n    }\n  }, {\n    key: \"loadNamespaces\",\n    value: function loadNamespaces(ns, callback) {\n      var _this6 = this;\n\n      var deferred = Object(_utils_js__WEBPACK_IMPORTED_MODULE_18__[\"defer\"])();\n\n      if (!this.options.ns) {\n        callback && callback();\n        return Promise.resolve();\n      }\n\n      if (typeof ns === 'string') ns = [ns];\n      ns.forEach(function (n) {\n        if (_this6.options.ns.indexOf(n) < 0) _this6.options.ns.push(n);\n      });\n      this.loadResources(function (err) {\n        deferred.resolve();\n        if (callback) callback(err);\n      });\n      return deferred;\n    }\n  }, {\n    key: \"loadLanguages\",\n    value: function loadLanguages(lngs, callback) {\n      var deferred = Object(_utils_js__WEBPACK_IMPORTED_MODULE_18__[\"defer\"])();\n      if (typeof lngs === 'string') lngs = [lngs];\n      var preloaded = this.options.preload || [];\n      var newLngs = lngs.filter(function (lng) {\n        return preloaded.indexOf(lng) < 0;\n      }); // Exit early if all given languages are already preloaded\n\n      if (!newLngs.length) {\n        if (callback) callback();\n        return Promise.resolve();\n      }\n\n      this.options.preload = preloaded.concat(newLngs);\n      this.loadResources(function (err) {\n        deferred.resolve();\n        if (callback) callback(err);\n      });\n      return deferred;\n    }\n  }, {\n    key: \"dir\",\n    value: function dir(lng) {\n      if (!lng) lng = this.languages && this.languages.length > 0 ? this.languages[0] : this.language;\n      if (!lng) return 'rtl';\n      var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];\n      return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';\n    }\n    /* eslint class-methods-use-this: 0 */\n\n  }, {\n    key: \"createInstance\",\n    value: function createInstance() {\n      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n      var callback = arguments.length > 1 ? arguments[1] : undefined;\n      return new I18n(options, callback);\n    }\n  }, {\n    key: \"cloneInstance\",\n    value: function cloneInstance() {\n      var _this7 = this;\n\n      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;\n\n      var mergedOptions = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, this.options, options, {\n        isClone: true\n      });\n\n      var clone = new I18n(mergedOptions);\n      var membersToCopy = ['store', 'services', 'language'];\n      membersToCopy.forEach(function (m) {\n        clone[m] = _this7[m];\n      });\n      clone.translator = new _Translator_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"](clone.services, clone.options);\n      clone.translator.on('*', function (event) {\n        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {\n          args[_key4 - 1] = arguments[_key4];\n        }\n\n        clone.emit.apply(clone, [event].concat(args));\n      });\n      clone.init(mergedOptions, callback);\n      clone.translator.options = clone.options; // sync options\n\n      return clone;\n    }\n  }]);\n\n  return I18n;\n}(_EventEmitter_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new I18n());\n\n//# sourceURL=webpack:///./node_modules/i18next/dist/es/i18next.js?");

/***/ }),

/***/ "./node_modules/i18next/dist/es/index.js":
/*!***********************************************!*\
  !*** ./node_modules/i18next/dist/es/index.js ***!
  \***********************************************/
/*! exports provided: default, changeLanguage, cloneInstance, createInstance, dir, exists, getFixedT, init, loadLanguages, loadNamespaces, loadResources, off, on, setDefaultNamespace, t, use */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeLanguage\", function() { return changeLanguage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cloneInstance\", function() { return cloneInstance; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createInstance\", function() { return createInstance; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dir\", function() { return dir; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"exists\", function() { return exists; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getFixedT\", function() { return getFixedT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadLanguages\", function() { return loadLanguages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadNamespaces\", function() { return loadNamespaces; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadResources\", function() { return loadResources; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"off\", function() { return off; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"on\", function() { return on; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setDefaultNamespace\", function() { return setDefaultNamespace; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"t\", function() { return t; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"use\", function() { return use; });\n/* harmony import */ var _i18next_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18next.js */ \"./node_modules/i18next/dist/es/i18next.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar changeLanguage = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].changeLanguage.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar cloneInstance = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cloneInstance.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar createInstance = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createInstance.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar dir = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dir.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar exists = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].exists.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar getFixedT = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getFixedT.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar init = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar loadLanguages = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadLanguages.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar loadNamespaces = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadNamespaces.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar loadResources = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadResources.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar off = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].off.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar on = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].on.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar setDefaultNamespace = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setDefaultNamespace.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar t = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].t.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar use = _i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use.bind(_i18next_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./node_modules/i18next/dist/es/index.js?");

/***/ }),

/***/ "./node_modules/i18next/dist/es/logger.js":
/*!************************************************!*\
  !*** ./node_modules/i18next/dist/es/logger.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"./node_modules/@babel/runtime/helpers/objectSpread.js\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/toConsumableArray.js\");\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nvar consoleLogger = {\n  type: 'logger',\n  log: function log(args) {\n    this.output('log', args);\n  },\n  warn: function warn(args) {\n    this.output('warn', args);\n  },\n  error: function error(args) {\n    this.output('error', args);\n  },\n  output: function output(type, args) {\n    var _console;\n\n    /* eslint no-console: 0 */\n    if (console && console[type]) (_console = console)[type].apply(_console, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3___default()(args));\n  }\n};\n\nvar Logger =\n/*#__PURE__*/\nfunction () {\n  function Logger(concreteLogger) {\n    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Logger);\n\n    this.init(concreteLogger, options);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Logger, [{\n    key: \"init\",\n    value: function init(concreteLogger) {\n      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n      this.prefix = options.prefix || 'i18next:';\n      this.logger = concreteLogger || consoleLogger;\n      this.options = options;\n      this.debug = options.debug;\n    }\n  }, {\n    key: \"setDebug\",\n    value: function setDebug(bool) {\n      this.debug = bool;\n    }\n  }, {\n    key: \"log\",\n    value: function log() {\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      return this.forward(args, 'log', '', true);\n    }\n  }, {\n    key: \"warn\",\n    value: function warn() {\n      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n\n      return this.forward(args, 'warn', '', true);\n    }\n  }, {\n    key: \"error\",\n    value: function error() {\n      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {\n        args[_key3] = arguments[_key3];\n      }\n\n      return this.forward(args, 'error', '');\n    }\n  }, {\n    key: \"deprecate\",\n    value: function deprecate() {\n      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {\n        args[_key4] = arguments[_key4];\n      }\n\n      return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);\n    }\n  }, {\n    key: \"forward\",\n    value: function forward(args, lvl, prefix, debugOnly) {\n      if (debugOnly && !this.debug) return null;\n      if (typeof args[0] === 'string') args[0] = \"\".concat(prefix).concat(this.prefix, \" \").concat(args[0]);\n      return this.logger[lvl](args);\n    }\n  }, {\n    key: \"create\",\n    value: function create(moduleName) {\n      return new Logger(this.logger, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, {\n        prefix: \"\".concat(this.prefix, \":\").concat(moduleName, \":\")\n      }, this.options));\n    }\n  }]);\n\n  return Logger;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new Logger());\n\n//# sourceURL=webpack:///./node_modules/i18next/dist/es/logger.js?");

/***/ }),

/***/ "./node_modules/i18next/dist/es/postProcessor.js":
/*!*******************************************************!*\
  !*** ./node_modules/i18next/dist/es/postProcessor.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  processors: {},\n  addPostProcessor: function addPostProcessor(module) {\n    this.processors[module.name] = module;\n  },\n  handle: function handle(processors, value, key, options, translator) {\n    var _this = this;\n\n    processors.forEach(function (processor) {\n      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);\n    });\n    return value;\n  }\n});\n\n//# sourceURL=webpack:///./node_modules/i18next/dist/es/postProcessor.js?");

/***/ }),

/***/ "./node_modules/i18next/dist/es/utils.js":
/*!***********************************************!*\
  !*** ./node_modules/i18next/dist/es/utils.js ***!
  \***********************************************/
/*! exports provided: defer, makeString, copy, setPath, pushPath, getPath, deepExtend, regexEscape, escape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defer\", function() { return defer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeString\", function() { return makeString; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"copy\", function() { return copy; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setPath\", function() { return setPath; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pushPath\", function() { return pushPath; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPath\", function() { return getPath; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deepExtend\", function() { return deepExtend; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"regexEscape\", function() { return regexEscape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"escape\", function() { return escape; });\n// http://lea.verou.me/2016/12/resolve-promises-externally-with-this-one-weird-trick/\nfunction defer() {\n  var res;\n  var rej;\n  var promise = new Promise(function (resolve, reject) {\n    res = resolve;\n    rej = reject;\n  });\n  promise.resolve = res;\n  promise.reject = rej;\n  return promise;\n}\nfunction makeString(object) {\n  if (object == null) return '';\n  /* eslint prefer-template: 0 */\n\n  return '' + object;\n}\nfunction copy(a, s, t) {\n  a.forEach(function (m) {\n    if (s[m]) t[m] = s[m];\n  });\n}\n\nfunction getLastOfPath(object, path, Empty) {\n  function cleanKey(key) {\n    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;\n  }\n\n  function canNotTraverseDeeper() {\n    return !object || typeof object === 'string';\n  }\n\n  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');\n\n  while (stack.length > 1) {\n    if (canNotTraverseDeeper()) return {};\n    var key = cleanKey(stack.shift());\n    if (!object[key] && Empty) object[key] = new Empty();\n    object = object[key];\n  }\n\n  if (canNotTraverseDeeper()) return {};\n  return {\n    obj: object,\n    k: cleanKey(stack.shift())\n  };\n}\n\nfunction setPath(object, path, newValue) {\n  var _getLastOfPath = getLastOfPath(object, path, Object),\n      obj = _getLastOfPath.obj,\n      k = _getLastOfPath.k;\n\n  obj[k] = newValue;\n}\nfunction pushPath(object, path, newValue, concat) {\n  var _getLastOfPath2 = getLastOfPath(object, path, Object),\n      obj = _getLastOfPath2.obj,\n      k = _getLastOfPath2.k;\n\n  obj[k] = obj[k] || [];\n  if (concat) obj[k] = obj[k].concat(newValue);\n  if (!concat) obj[k].push(newValue);\n}\nfunction getPath(object, path) {\n  var _getLastOfPath3 = getLastOfPath(object, path),\n      obj = _getLastOfPath3.obj,\n      k = _getLastOfPath3.k;\n\n  if (!obj) return undefined;\n  return obj[k];\n}\nfunction deepExtend(target, source, overwrite) {\n  /* eslint no-restricted-syntax: 0 */\n  for (var prop in source) {\n    if (prop in target) {\n      // If we reached a leaf string in target or source then replace with source or skip depending on the 'overwrite' switch\n      if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {\n        if (overwrite) target[prop] = source[prop];\n      } else {\n        deepExtend(target[prop], source[prop], overwrite);\n      }\n    } else {\n      target[prop] = source[prop];\n    }\n  }\n\n  return target;\n}\nfunction regexEscape(str) {\n  /* eslint no-useless-escape: 0 */\n  return str.replace(/[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|]/g, '\\\\$&');\n}\n/* eslint-disable */\n\nvar _entityMap = {\n  '&': '&amp;',\n  '<': '&lt;',\n  '>': '&gt;',\n  '\"': '&quot;',\n  \"'\": '&#39;',\n  '/': '&#x2F;'\n};\n/* eslint-enable */\n\nfunction escape(data) {\n  if (typeof data === 'string') {\n    return data.replace(/[&<>\"'\\/]/g, function (s) {\n      return _entityMap[s];\n    });\n  }\n\n  return data;\n}\n\n//# sourceURL=webpack:///./node_modules/i18next/dist/es/utils.js?");

/***/ })

/******/ });