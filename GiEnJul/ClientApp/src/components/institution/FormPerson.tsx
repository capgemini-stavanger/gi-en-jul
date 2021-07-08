import {
	capitalize,
	Checkbox,
	FormControlLabel,
	Grid,
	SvgIcon,
	IconButton,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { GENDERS } from "../../common/constants/Genders";
import Gender from "../../common/enums/Gender";
import InputValidator from "../InputFields/Validators/InputValidator";
import { isNotNull } from "../InputFields/Validators/Validators";
import IFormPerson from "./IFormPerson";

interface PersonProps {
	updatePerson: (newPerson: IFormPerson) => void;
	deletePerson: () => void;
	viewErrorTrigger: number;
	person: IFormPerson;
}

const InstitutionPerson: FC<PersonProps> = ({
	updatePerson,
	deletePerson,
	viewErrorTrigger,
	person,
}) => {
	const [age, setAge] = useState("");
	const [gender, setGender] = useState(Gender.Unspecified);
	const [wish, setWish] = useState("");
	const [isAgeWish, setIsAgeWish] = useState(false);
	const [isValidAge, setIsValidAge] = useState(false);
	const [isValidGender, setIsValidGender] = useState(false);
	const [isValidWishInput, setIsValidWishInput] = useState(false);
	const [isValidWish, setIsValidWish] = useState(false);

	useEffect(() => {
		setIsValidWish(isValidWishInput || isAgeWish);
	}, [isValidWishInput, isAgeWish]);

	useEffect(() => {
		let tmpPerson = person;
		tmpPerson.age = age;
		tmpPerson.gender = gender;
		tmpPerson.wish = isAgeWish ? undefined : wish;
		tmpPerson.isValidAge = isValidAge;
		tmpPerson.isValidGender = isValidGender;
		tmpPerson.isValidWish = isValidWish;
		updatePerson(tmpPerson);
	});

	const onAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let strAge = e.target.value;
		let intAge = parseInt(strAge);
		if (intAge) {
			if (intAge > 130) {
				strAge = "130";
			} else if (intAge < 0) {
				strAge = "0";
			}
		}
		setAge(strAge);
	};

	const onGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let newGender = parseInt(e.target.value);
		if (newGender !== Gender.Unspecified) {
			setGender(newGender);
			setIsValidGender(true);
		}
	};

	return (
		<Grid container spacing={1} alignItems="center">
			<Grid item>
				<IconButton color="secondary" onClick={deletePerson}>
					<SvgIcon component={ClearIcon} />
				</IconButton>
			</Grid>
			<Grid item xs={2}>
				<InputValidator
					viewErrorTrigger={viewErrorTrigger}
					validators={[isNotNull]}
					setIsValids={setIsValidAge}
					name="age"
					type="number"
					label="Alder"
					value={age}
					onChange={onAgeChange}
				/>
			</Grid>
			<Grid item xs={2}>
				<InputValidator
					viewErrorTrigger={viewErrorTrigger}
					validators={[isNotNull]}
					setIsValids={setIsValidAge}
					name="gender"
					type="select"
					label="Kjønn"
					variant={"outlined"}
					value={gender ? gender : ""}
					onChange={onGenderChange}
					options={GENDERS.map((o) => {
						return { value: o.value, text: capitalize(o.text) };
					})}
					fullWidth
				/>
			</Grid>
			<Grid item xs>
				<InputValidator
					viewErrorTrigger={viewErrorTrigger}
					validators={[
						(input) => {
							return isAgeWish || isNotNull(input);
						},
					]}
					setIsValids={setIsValidWishInput}
					name="wish"
					label="Gaveønske (husk størrelse)"
					disabled={isAgeWish}
					value={wish}
					onChange={(e) => setWish(e.target.value)}
					fullWidth
				/>
			</Grid>
			<Grid item xs>
				<FormControlLabel
					control={
						<Checkbox
							checked={isAgeWish}
							onChange={(e) => setIsAgeWish(e.target.checked)}
							name="isAgeWish"
							color="primary"
						/>
					}
					className="my-0"
					label="Giver kjøper alderstilpasset gave"
				/>
			</Grid>
		</Grid>
	);
};

export default InstitutionPerson;
