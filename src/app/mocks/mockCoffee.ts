import { CoffeeModel, RoastType, SizeType } from '../model/CoffeeModel';

const mockCoffee1: CoffeeModel = {
	"id": 1,
	"active": true,
	"roaster": "Tim Horton's",
	"variety": '',
	"size": 14,
	"roast": RoastType.DARK,
	"format": "k-pod",
	"grind": SizeType.EIGHT,
	"origin": [''],
	"singleOrigin": true,
	"tastingNotes": ''
};
const mockCoffee2: CoffeeModel =
{
	"id": 2,
	"active": false,
	"roaster": "Tim Horton's",
	"variety": '',
	"size": SizeType.TWENTY,
	"roast": RoastType.DARK,
	"format": "k-pod",
	"grind": 4,
	"origin": [''],
	"singleOrigin": false,
	"tastingNotes": ''
};
const mockCoffee3: CoffeeModel =
{
	"id": 3,
	"active": false,
	"roaster": "Paper Plane",
	"variety": '',
	"size": SizeType.EIGHT,
	"roast": RoastType.MEDIUM,
	"format": "bean",
	"grind": 6,
	"origin": [''],
	"singleOrigin": false,
	"tastingNotes": ''
};
const mockCoffee4: CoffeeModel =
{
	"id": 4,
	"active": false,
	"roaster": "Paper Plane",
	"variety": '',
	"size": SizeType.FOURTEEN,
	"roast": RoastType.MEDIUM,
	"format": "ground",
	"grind": 9,
	"origin": [''],
	"singleOrigin": true,
	"tastingNotes": ''
};
const mockCoffee5: CoffeeModel =
{
	"id": 5,
	"active": true,
	"roaster": "Eight O'Clock",
	"variety": '',
	"size": SizeType.TWENTYFOUR,
	"roast": RoastType.DARK,
	"format": "ground",
	"grind": 7,
	"origin": [''],
	"singleOrigin": false,
	"tastingNotes": ''
};

const mockCoffeeArray: CoffeeModel[] = [mockCoffee1, mockCoffee2, mockCoffee3, mockCoffee4, mockCoffee5]

const mockCoffeeArrayByRoaster: CoffeeModel[] = [mockCoffee3, mockCoffee4];

export { mockCoffee1, mockCoffee2, mockCoffee3, mockCoffee4, mockCoffeeArray, mockCoffeeArrayByRoaster };
