import React, {useCallback, useEffect, useState} from 'react';
import './InlineForm.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    // const [subject, setSubject] = useState('physical');
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            summary,
            description,
            queryId,
            // subject
        }
        tg.sendData(JSON.stringify(data));
        // fetch('http://85.119.146.179:8000/web-data', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
    // }, [summary, street, subject])
    }, [summary, description])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!description || !summary) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [summary, description])

    const onChangeSummary = (e) => {
        setSummary(e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    // const onChangeSubject = (e) => {
    //     setSubject(e.target.value)
    // }

    return (
        <div className={"form"}>
            <h3>Инлайн форма</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Тема'}
                value={summary}
                onChange={onChangeSummary}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Описание'}
                value={description}
                onChange={onChangeDescription}
            />
            {/* <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'text_1'}>Текст 1</option>
                <option value={'text_2'}>Текст 2</option>
            </select> */}
        </div>
    );
};

export default Form;