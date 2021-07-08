import {
	FormControl,
	FormControlTypeMap,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import React, { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { isMobile } from "../../common/functions/IsMobile";

export interface ISelect
	extends OverridableComponent<FormControlTypeMap<{}, "div">> {
	name: string;
	options: {
		value: string | number | readonly string[] | undefined;
		text: string;
	}[];
	value: string | number | readonly string[] | undefined;
	onChange: (
		event: React.ChangeEvent<{ name?: string; value: unknown }>,
		child: React.ReactNode
	) => void;

	id?: string;
	className?: string;
	label?: string;
	placeholder?: string;
	autoComplete?: string;
	errorMessage?: string;
	error?: boolean;
	autoFocus?: boolean;
}

const SelectInput: FC<ISelect> = ({
	name,
	options,
	value,
	onChange,

	id,
	className,
	label,
	placeholder,
	autoComplete,
	errorMessage,
	error,
	autoFocus,
	...rest
}) => {
	const [isMob, setIsMob] = useState(false);

	useEffect(() => {
		setIsMob(isMobile());
	});

	return (
		<FormControl error={!!errorMessage} {...rest}>
			<InputLabel htmlFor={id}>{label}</InputLabel>
			<Select
				native={isMobile()}
				error={!!error}
				value={value}
				onChange={onChange}
				autoFocus={autoFocus}
				label={label}
				inputProps={{
					name: name,
					id: id,
				}}
				autoComplete={autoComplete}
				placeholder={placeholder}
				className={className}
			>
				{options &&
					options.map((o) => {
						return isMob ? (
							<option
								key={`n_${name}_${o.text}`}
								value={o.value}
								className="text-capitalize"
							>
								{o.text}
							</option>
						) : (
							<MenuItem
								key={`${name}_${o.text}`}
								value={o.value}
								className="text-capitalize"
							>
								{o.text}
							</MenuItem>
						);
					})}
			</Select>
			{error && errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
		</FormControl>
	);
};

export default SelectInput;
