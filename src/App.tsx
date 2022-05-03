import { useState } from 'react';
import ListView from './components/ListView';
import ReactiveListView from './components/ReactiveListView';

const App = () => {

	const [extraNum, setExtraNum] = useState(0);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		let newValue = parseInt(e.target.extraNum.value);
		!isNaN(newValue) && setExtraNum(newValue);
	}

	return (
		<div style={{ fontFamily: '微軟正黑體', color: '#454545' }}>
			<div style={{ textAlign: 'center' }}>
				<h2>
					Enable highlight update devtool and try to change price :){' '}
				</h2>
				<h4>
					if you want to see a more obvious gap, please increaes the number of extra items
				</h4>
			</div>
			<form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
				number of extra items:
				<input
					type='number'
					name='extraNum'
					style={{ margin: '10px' }}
					defaultValue={0}
					min={0}
					step={1}
					max={1000}
				/>
				<button type='submit'>Apply</button>
			</form>
			<div
				style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
			>
				<ListView extraItemNum={extraNum} />
				<ReactiveListView extraItemNum={extraNum} />
			</div>
		</div>
	);
}

export default App;
