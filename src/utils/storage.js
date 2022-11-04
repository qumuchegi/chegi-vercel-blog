// 慎用 localStorage，大小有限制
export class StorageDb {
  static storage = window.localStorage;
  clusterId;
  constructor(clusterId) {
    this.clusterId = clusterId;
  }

  static _getCluster(clusterId) {
    let clusterStr = StorageDb.storage.getItem(clusterId);
    let clusterObj;
    if (!clusterStr) {
      clusterObj = { clusterId, cluster: {} };
      StorageDb._setCluster(clusterId, clusterObj);
    } else {
      clusterObj = JSON.parse(clusterStr);
    }
    return clusterObj;
  }

  static _setCluster(clusterId, cluster) {
    try {
      StorageDb.storage.setItem(clusterId, JSON.stringify(cluster));
    } catch (err) {
      __DEV__ && console.log(err);
    }
  }

  set(key, value) {
    const cluster = StorageDb._getCluster(this.clusterId);
    cluster.cluster[key] = value;
    StorageDb._setCluster(this.clusterId, cluster);
  }

  get(key) {
    const cluster = StorageDb._getCluster(this.clusterId);
    return cluster.cluster[key];
  }

  remove(key) {
    const cluster = StorageDb._getCluster(this.clusterId);
    delete cluster.cluster[key];
    StorageDb._setCluster(this.clusterId, cluster);
  }

  clear() {
    StorageDb.storage.removeItem(this.clusterId);
  }
}
