class LogsController {
  constructor($scope, $log) {
    'ngInject';
    this.$log = $log;
    this.$onInit = () => {
      $scope.$watch(() => this.model ? this.model.length : 0, (value) => {
        // this.$log.debug('Processing tests' + this.model.length);
        if (value){
          this.logs = this.getLogs(this.model);
        }
      });
    }

  }

  getLogs(tests) {
    let result = [];
    for (let test of tests) {
      for (let exp of test.failedExpectations) {
        result.push(...exp.logs);
      }
      for (let exp of test.passedExpectations) {
        result.push(...exp.logs);
      }
    }
    return result;
  }

}


export let LogsComponent = {
  bindings: {
    model: '<',
    filtering: '<'
  },
  templateUrl: 'app/components/logs/logs.html',
  controller: LogsController
};
