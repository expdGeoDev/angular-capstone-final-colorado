
type RoastType = 'blonde' | 'dark' | 'espresso' | 'light' | 'medium' | 'medium-dark'
type FormatType = 'ground' | 'bean' | 'k-pod'

export interface CoffeeModel {
	id: number;
	active: boolean;
	roaster: string;
	variety?: string;
	size: number;
	roast: RoastType;
	format: FormatType;
	grind: number;
	origin: string[];
	singleOrigin: boolean;
	tastingNotes: string;
}
