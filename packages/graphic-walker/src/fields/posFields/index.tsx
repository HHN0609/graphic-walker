import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Droppable } from "@kanaries/react-beautiful-dnd";
import { useGlobalStore } from '../../store';
import { FieldListContainer } from "../components";
import { DRAGGABLE_STATE_KEYS } from '../fieldsContext';
import OBFieldContainer from '../obComponents/obFContainer';

const PosFields: React.FC = props => {
    const { vizStore } = useGlobalStore();
    const { visualConfig } = vizStore;
    const { geoms, coordSystem = 'generic' } = visualConfig;

    const channels = useMemo(() => {
        if (coordSystem === 'geographic') {
            if (geoms[0] === 'choropleth') {
                return DRAGGABLE_STATE_KEYS.filter(f => f.id === 'geoId');
            }
            return DRAGGABLE_STATE_KEYS.filter(f => f.id === 'longitude' || f.id === 'latitude');
        }
        if (geoms[0] === 'arc') {
            return DRAGGABLE_STATE_KEYS.filter(f => f.id === 'radius' || f.id === 'theta');
        }
        return DRAGGABLE_STATE_KEYS.filter(f => f.id === 'columns' || f.id === 'rows');
    }, [geoms[0], coordSystem])
    return <div>
        {
            channels.map(dkey => <FieldListContainer name={dkey.id} key={dkey.id}>
                <Droppable droppableId={dkey.id} direction="horizontal">
                    {(provided, snapshot) => (
                        <OBFieldContainer dkey={dkey} provided={provided} />
                    )}
                </Droppable>
            </FieldListContainer>)
        }
    </div>
}

export default observer(PosFields);