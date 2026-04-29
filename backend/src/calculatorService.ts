class CalculatorService {
  calculate(distance: any, transportType: any, carType: any, passenger: any, country: any): any {
    var result = 0;
    var label = '';

    // Still nested if-else hell
    if (transportType === 'bike' || transportType === 'walk') {
      result = 0;
      label = 'GREEN';
    } else if (transportType === 'car') {
      result = this._calculateCar(distance, carType, passenger, country);
      label = this._getLabel(result);
    } else if (transportType === 'train') {
      result = this._calculateTrain(distance, country);
      label = this._getLabel(result);
    } else if (transportType === 'bus') {
      result = distance * 0.104;
      label = this._getLabel(result);
    }

    return { co2: result, label: label };
  }

  _calculateCar(d: any, ct: any, p: any, c: any): number {
    var result = 0;
    if (ct === 'thermal') {
      result = d * 0.192;
    } else if (ct === 'electric') {
      if (c === 'France') {
        result = d * 0.012;
      } else if (c === 'Germany') {
        result = d * 0.045;
      } else if (c === 'Poland') {
        result = d * 0.078;
      } else {
        result = d * 0.04;
      }
    } else if (ct === 'hybrid') {
      result = d * 0.098;
    }

    if (p > 0) {
      result = result / p;
    }

    return result;
  }

  _calculateTrain(d: any, c: any): number {
    var result = 0;
    if (c === 'France') {
      result = d * 0.0032;
    } else if (c === 'Germany') {
      result = d * 0.032;
    } else if (c === 'Poland') {
      result = d * 0.069;
    } else if (c === 'Norway') {
      result = d * 0.001;
    } else {
      result = d * 0.041;
    }
    return result;
  }

  _getLabel(result: number): string {
    if (result < 5) {
      return 'GREEN';
    } else if (result >= 5 && result < 15) {
      return 'ORANGE';
    } else {
      return 'RED';
    }
  }
}

export default new CalculatorService();
