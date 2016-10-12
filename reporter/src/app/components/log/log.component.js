class LogController {
  constructor($log, $scope) {
    'ngInject';
    this.$log = $log;
    this.$onInit = () => {
      $scope.$watch(() => this.model, () => {
        this.$log.debug('Processing log model' + this.model.length);
        this.log = this.extract(this.model);
      });
    }
  }

  logLevel() {
    switch (this.log.level.toUpperCase()) {
      case 'INFO':
        return 'text-info';
      case 'WARNING':
        return 'text-warning';
      case 'SEVERE':
      case 'ERROR':
        return 'text-danger';
      case 'DEBUG':
        return 'text-muted';
      default:
        return '';
    }
  }

  //some log messages contains as a message object
  extract(log) {
    try {
      let obj = angular.fromJson(log.message);
      let newLog = obj.message;
      if (newLog) {
        newLog.message = newLog.text;
        return newLog;
      }
    } catch (ex) {
      this.$log.debug(ex);
      return log;
    }
  }
}


export let LogComponent = {
  bindings: {
    model: '<'
  },
  templateUrl: 'app/components/log/log.html',
  controller: LogController
};
