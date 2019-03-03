// 数组转stream
function array_to_stream(array,start,end){
    if(start == null && end == null){
        return array_to_stream(array,0,array.length-1);
    }

    if(array.length == 0 || start > end){
        return empty_stream();
    }

    return cons_stream(
            array[start],
            array_to_stream(array,start+1,end)
    );
}

// stream map 操作
function map_stream(mapper,stream){
    if(is_empty_stream(stream)){
        return empty_stream();
    }

    return cons_stream(
        mapper(head(stream)),
        map_stream(mapper,tail(stream))
    );
}

// stream filter 操作
function filter_stream(predicate,stream){
    if(is_empty_stream(stream)){
        return empty_stream();
    }

    if(predicate(head(stream))){
        return cons_stream(
                head(stream),
                filter_stream(predicate,tail(stream))
            );
    }else{
        return filter_stream(predicate,tail(stream));
    }
}

// stream accumulate 操作
function accumulate_stream(combiner,initVal,stream){
	if(is_empty_stream(stream)){
		return initVal;
	}
	
	let v1 = head(stream);
	let v2 = accumulate_stream(combiner,initVal,tail(stream));
	
	return combiner(v1,v2);
}

// stream append 操作
// 在stream1后面拼接stream2
function append_stream(stream1,stream2){
	if(is_empty_stream(stream1)){
		return stream2;
	}
	
	let the_head = head(stream1);
	let the_tail = append_stream(tail(stream1),stream2);
	
	return cons_stream(the_head,the_tail);
}

// stream flatten 扁平化操作
function flatten_stream(stream_in_stream){
	return accumulate_stream(
		append_stream,
		empty_stream(),
		stream_in_stream
	)
}