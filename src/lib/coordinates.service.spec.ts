import { TestBed } from '@angular/core/testing';
import { CoordinatesService } from './coordinates.service';
import { Direction } from './direction.enum';

// Mostly covered by the "Component and pipe" suit.
describe('Service', () => {
  let service: CoordinatesService;

  beforeEach(() => {
    service = TestBed.get(CoordinatesService);
  });

  it('should validate degree values', () => {
    expect(service.isValidDegree(`40°0'0"`)).toBe(true);
    expect(service.isValidDegree(`40°`)).toBe(true);
    expect(service.isValidDegree(`40°0'`)).toBe(true);
    expect(service.isValidDegree(`0°0'0"`)).toBe(true);
    expect(service.isValidDegree(`180°0'0"`)).toBe(true);
    expect(service.isValidDegree(40)).toBe(false);
    expect(service.isValidDegree(`40°błąd'`)).toBe(false);
    expect(service.isValidDegree(`180°1'0"`)).toBe(false);
    expect(service.isValidDegree(`40°0"`)).toBe(false);
    expect(service.isValidDegree(`181°0'0"`)).toBe(false);
    expect(service.isValidDegree(`0°60'0"`)).toBe(false);
    expect(service.isValidDegree(`0°0'60"`)).toBe(false);
    expect(service.isValidDegree(`0°0'90"`)).toBe(false);
    expect(service.isValidDegree(`0°82'90"`)).toBe(false);
    expect(service.isValidDegree(`niepoprawny`)).toBe(false);
  });

  it('should validate degree values depending on the direction if provided', () => {
    expect(service.isValidDegree(`180°0'0"`, Direction.Longitude)).toBe(true);
    expect(service.isValidDegree(`181°0'0"`, Direction.Longitude)).toBe(false);
    expect(service.isValidDegree(`90°0'0"`, Direction.Latitude)).toBe(true);
    expect(service.isValidDegree(`91°0'0"`, Direction.Latitude)).toBe(false);
  });

  it('should consider added direction as a valid value', () => {
    expect(service.isValidDegree(`180°0'0" W`, Direction.Longitude)).toBe(true);
    expect(service.isValidDegree(`180°0'0" E`, Direction.Longitude)).toBe(true);
    expect(service.isValidDegree(`90°0'0" N`, Direction.Latitude)).toBe(true);
    expect(service.isValidDegree(`90°0'0" S`, Direction.Latitude)).toBe(true);
    expect(service.isValidDegree(`180°0'0" N`, Direction.Latitude)).toBe(false);
    expect(service.isValidDegree(`180°0'0" S`, Direction.Latitude)).toBe(false);
    expect(service.isValidDegree(`200°0'0" W`, Direction.Latitude)).toBe(false);
    expect(service.isValidDegree(`200°0'0" E`, Direction.Latitude)).toBe(false);
  });

  it('should validate digit values', () => {
    expect(service.isValidDigit(0)).toBe(true);
    expect(service.isValidDigit(10)).toBe(true);
    expect(service.isValidDigit(-10)).toBe(true);
    expect(service.isValidDigit(10.234523)).toBe(true);
    expect(service.isValidDigit(10.9999)).toBe(true);
    expect(service.isValidDigit(180)).toBe(true);
    expect(service.isValidDigit(-180)).toBe(true);
    expect(service.isValidDigit('10')).toBe(true);
    expect(service.isValidDigit('10.9999')).toBe(true);
    expect(service.isValidDigit(NaN)).toBe(false);
    expect(service.isValidDigit('łańcuch')).toBe(false);
    expect(service.isValidDigit(-181)).toBe(false);
    expect(service.isValidDigit(181)).toBe(false);
  });

  it('should validate digit values depending on the direction if provided', () => {
    expect(service.isValidDigit(180, Direction.Longitude)).toBe(true);
    expect(service.isValidDigit(-180, Direction.Longitude)).toBe(true);
    expect(service.isValidDigit(181, Direction.Longitude)).toBe(false);
    expect(service.isValidDigit(-181, Direction.Longitude)).toBe(false);
    expect(service.isValidDigit(90, Direction.Latitude)).toBe(true);
    expect(service.isValidDigit(-90, Direction.Latitude)).toBe(true);
    expect(service.isValidDigit(91, Direction.Latitude)).toBe(false);
    expect(service.isValidDigit(-91, Direction.Latitude)).toBe(false);
  });
});
