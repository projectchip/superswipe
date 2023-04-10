import React, { useEffect, useState } from 'react';
import styles from "../styles/filterBar.module.css"
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';

const CSSOutlinedInput = styled(OutlinedInput)({
	'& label.Mui-focused': {
		color: '#f7f8fd',
	  },
	'& .MuiInput-underline:after': {
		borderBottomColor: '#f7f8fd',
		border: 0,
		borderWidth: '0px'
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: '#f7f8fd',
			border: 0,
			borderWidth: '0px'
		},
		'&:hover fieldset': {
			borderColor: '#f7f8fd',
			border: 0,
			borderWidth: '0px'
		},
		'&.Mui-focused fieldset': {
			borderColor: '#f7f8fd',
			border: 0,
			borderWidth: '0px'
		},
	}
});

const CSSSelect = styled(Select)({
	'.MuiOutlinedInput-notchedOutline': {
		border: 0,
		borderWidth: '2px'
	},
});

const SelectComponent = ({title, setterFunction, labels}
	:
	{title: string, setterFunction: Function, labels: string}) => {
		const [selected, setSelected] = useState<string[]>([]);
		const [loading, setLoading] = useState(true);
		const [selectData, setSelectData] = useState<Array<string>>(['', '']);
		
		useEffect(()=>{
			const clearBtn = document.getElementById('clear-filter-btn');
			clearBtn?.addEventListener('click', clearFilters);
		}, [])

		useEffect(()=>{
			getSelectLabels();
		}, [])

		const getSelectLabels = async () => {
			const response = await fetch(`/api/${labels}`);
			const data = await response.json();
			setLoading(false);
			setSelectData(data);
		}

		const clearFilters = () => {
			setSelected([]);
		}

		const ITEM_HEIGHT = 48;
		const ITEM_PADDING_TOP = 8;
		const MenuProps = {
			PaperProps: {
				style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
				},
			},
		};
	
		const handleChange = (event: SelectChangeEvent<typeof selected>) => {
			const {
			target: { value },
			} = event;

			setSelected(
			typeof value === 'string' ? value.split(',') : value,
			);
			setterFunction(value);
		};

    return (
		<div className={styles.selectComp}>
			{
				loading ? null :
				<FormControl sx={{ width: '100%' }}>
					<InputLabel id="multiple-checkbox-label">{title}</InputLabel>
					<CSSSelect
						labelId="multiple-checkbox-label"
						id="multiple-checkbox"
						multiple
						placeholder={title}
						value={selected}
						onChange={(e:SelectChangeEvent<any>)=>handleChange(e)}
						input={<CSSOutlinedInput />}
						renderValue={(selected: any) => selected.join(', ')}
						MenuProps={MenuProps}
					>
						{selectData.map((name) => {return (
							<MenuItem key={name} value={name}>
							<Checkbox checked={selected.indexOf(name) > -1} />
							<ListItemText primary={name} />
							</MenuItem>
						)})}
					</CSSSelect>
				</FormControl>
			}
		</div>
    );
}

SelectComponent.propTypes = {
	title: PropTypes.string.isRequired,
}

export default SelectComponent;