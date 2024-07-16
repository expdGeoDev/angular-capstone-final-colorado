type FormatType = 'ground' | 'bean' | 'k-pod';

export enum SizeType {
	'EIGHT' = 8,
	'TWELVE' = 12,
	'FOURTEEN' = 14,
	'SIXTEEN' = 16,
	'TWENTY' = 20,
	'TWENTYFOUR' = 24,
}
export enum RoastType {
	'BLONDE' = 'blonde',
	'DARK' = 'dark',
	'ESPRESSO' = 'espresso',
	'LIGHT' = 'light',
	'MEDIUM' = 'medium',
	'MEDIUM-DARK' = 'medium-dark',
}

export interface CoffeeModel {
	id: number;
	active: boolean;
	roaster: string;
	variety?: string;
	size: SizeType;
	roast: RoastType;
	format: FormatType;
	grind: number;
	origin: string[];
	singleOrigin: boolean;
	tastingNotes: string;
}
