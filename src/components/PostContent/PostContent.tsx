import React, { useContext, useState, useEffect } from 'react';
import { FetchContext } from '../../Global/GlobalStates/GlobalStates';
import { fetchSinglePost, LoadState } from '../../Global/GlobalFunctions/FetchingActions';
import { ResponseDataType, PostType } from '../../models';
import HtmlContent from '../../components/HtmlContent/HtmlContent';
import LoadingPlaceholder from '../../components/LoadingPlaceholder/LoadingPlaceholder';

const initialPost: PostType = {
    id: 0,
    title: "",
    content: "",
    author: "",
    time: "",
    last_edited: ""
}

interface PostContentProps {
    id: string
}

const PostContent: React.FC<PostContentProps> = ({ id }: PostContentProps) => {
    const { apiFetcher } = useContext(FetchContext);
    const [post, setPost] = useState(initialPost);
    const [loadState, setLoadState] = useState(LoadState.NOTLOADED);

    useEffect(() => {
        if (loadState === LoadState.NOTLOADED) {
            setLoadState(LoadState.LOADING);
            fetchSinglePost(apiFetcher, id, (post: ResponseDataType<PostType>) => {
                setPost(post.results);
                setLoadState(LoadState.LOADED);
            }, (error: Error) => {
                console.log(error);
                setPost(initialPost);
                setLoadState(LoadState.LOADED);
                //tid = setTimeout(()=>setLoadState(LoadState.NOTLOADED)); //Uncomment if want to have infinite fetching
            });
        }
    }, [id, loadState, apiFetcher]);

    if (loadState === LoadState.LOADING) {
        return (<LoadingPlaceholder />);
    } else {
        console.log(post);
        return (
            <>
                <h1>{post.title}</h1>
                <HtmlContent content={post.content} />
            </>
        )
    }
};
export default PostContent;